import React, { useState, useRef, useEffect, } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";

import { NativeModules, Platform, NativeEventEmitter, Alert } from "react-native";

import { requestMicrophonePermission } from "../utils/liveMicUtils";

import { CENSFeatures } from "../audio/FeaturesCENS";
import { FeaturesConstructor } from "../audio/Features";
import { CSVRow, loadCsvInfo } from '../utils/csvParsingUtils';
import { 
  getScoreCSVData,
} from "../score_name_to_data_map/unifiedScoreMap";

import { intonationToNoteColor } from '../audio/Intonation';
import { NoteColor } from "../utils/musicXmlUtils";

interface PerformanceScreenProps {
  score: string; // Selected score name
  dispatch: (action: { type: string; payload?: any }) => void; // Dispatch function used to update global state
  bpm?: number; // Optional BPM number,
  FeaturesCls?: FeaturesConstructor<any>;
  state: any;
}

// Semitone based params
const ADVANCE_THRESHOLD = 0.2;
const MAX_INPUT_DEVIATION = 16;
const MIN_ADVANCE_TIME = 10; // ms
const SAME_PITCH_WAIT_FRACTION = 0.5;

let AudioPerformanceModule: any;
if (Platform.OS === "android") {
  try {
    console.log("Loading AudioPerformanceModule...");
    AudioPerformanceModule = NativeModules.AudioPerformanceModule;
    console.log("AudioPerformanceModule instance:", AudioPerformanceModule);
  } catch (e) {
    console.log("Failed to load AudioPerformanceModule: ", e);
  }
}

const audioEvents = new NativeEventEmitter(AudioPerformanceModule);

export default function PerformanceScreen({
  score,
  dispatch,
  bpm = 100,
  FeaturesCls = CENSFeatures,
  state,
}: PerformanceScreenProps) {
  const expNoteIdxRef = useRef<number>(0);
  const noteColorsRef = useRef<NoteColor[]>([]);
  const csvDataRef = useRef<CSVRow[]>([]); 
  const pitchBufferRef = useRef<number[]>([]); // Buffer for median filtering
  const lastAdvanceTimeRef = useRef<number>(0);

  const [isProcessing, setIsProcessing] = useState(false);
  const [testInput, setTestInput] = useState<number>(0);
  const updateScheduled = useRef<boolean>(false);
  const latestBeat = useRef<number>(0);
  const lastDispatchedBeat = useRef<number | null>(null);

  const scheduleBeatUpdate = (beat: number) => {
    latestBeat.current = beat;
    if (!updateScheduled.current) {
      updateScheduled.current = true;
      requestAnimationFrame(() => {
        if (latestBeat.current !== lastDispatchedBeat.current) {
            dispatch({ type: "SET_ESTIMATED_BEAT", payload: latestBeat.current });
            lastDispatchedBeat.current = latestBeat.current;
        }
        updateScheduled.current = false;
      });
    }
  };


  useEffect(() => {
    console.log("Adding subscription to audio events");
    const subscription = audioEvents.addListener("onPitchDetected", handlePitchUpdate);
    console.log("Subscription:", subscription);

    return () => {
      console.log("Subscription teardown");
      subscription.remove();
      AudioPerformanceModule.stopProcessing();
      setIsProcessing(false);
    };
  }, [dispatch]); 

  const runPerformance = async () => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      Alert.alert("Permission Denied", "Microphone access is required to run the performance.");
      return;
    }

    if (!score) return;

    expNoteIdxRef.current = 0;
    noteColorsRef.current = [];
    pitchBufferRef.current = []; // Reset buffer
    lastAdvanceTimeRef.current = Date.now();

    const base = score.replace(/\.musicxml$/, "");
    const csvUri = getScoreCSVData(base);
    const noteTable = await loadCsvInfo(csvUri);
    csvDataRef.current = noteTable; 

    console.log("Isplaying=", state.playing, "\nDispatch start/stop");
    dispatch({ type: "SET_NOTE_COLORS", payload: [] });
    dispatch({ type: "start/stop" });

    // Start Native Audio Engine
    await AudioPerformanceModule.startProcessing();
    setIsProcessing(true);
  };

  const handlePitchUpdate = (freq: number) => {
    // console.log("Pitch update:", freq);
    if (freq <= 0) return;

    const noteTable: CSVRow[] = csvDataRef.current;
    const expNoteIndex = expNoteIdxRef.current;
    
    if (!noteTable || expNoteIndex >= noteTable.length) return;

    const targetNote = noteTable[expNoteIndex];
    
    // 1. Convert to MIDI
    const detectedMidi = 69 + 12 * Math.log2(freq / 440);

    // 2. Outlier Rejection (> 16 semitones from target)
    if (Math.abs(detectedMidi - targetNote.midi) > MAX_INPUT_DEVIATION) {
        return;
    }

    // 3. Median Buffering
    const buffer = pitchBufferRef.current;
    buffer.push(detectedMidi);
    if (buffer.length > 5) buffer.shift(); // Keep last 5 samples

    const sorted = [...buffer].sort((a, b) => a - b);
    const medianMidi = sorted[Math.floor(sorted.length / 2)];

    const intonation: number = calculateIntonation(medianMidi, targetNote);
    // silence or no note
    if (Number.isNaN(intonation)) return;

    // update note color of latest attempt
    // console.log("Intonation", intonation, intonationToNoteColor(intonation, expNoteIndex), noteColorsRef.current);
    const newNoteColor = intonationToNoteColor(intonation, expNoteIndex);
    
    // Check if color actually changed to avoid unnecessary re-renders/bridge traffic
    if (noteColorsRef.current[expNoteIndex]?.color !== newNoteColor.color) {
        noteColorsRef.current[expNoteIndex] = newNoteColor;
        dispatch({
            type: "ADD_NOTE_COLOR",
            payload: { color: newNoteColor, index: expNoteIndex },
        });
    }

    // if attempt within range, advance note
    if (Math.abs(intonation) < ADVANCE_THRESHOLD) {
      const now = Date.now();
      const timeSinceLastAdvance = now - lastAdvanceTimeRef.current;

      // Check general time constraint
      if (timeSinceLastAdvance < MIN_ADVANCE_TIME) return;

      // Check same pitch class constraint
      if (expNoteIndex + 1 < noteTable.length) {
        const currentNote = noteTable[expNoteIndex];
        const nextNote = noteTable[expNoteIndex + 1];

        // If next note is same pitch class (e.g. C4 and C5, or same note)
        if (currentNote.midi % 12 === nextNote.midi % 12) {
          const expectedDuration = nextNote.refTime - currentNote.refTime;
          // Wait fraction of the time between notes
          if (timeSinceLastAdvance < expectedDuration * 1000 * SAME_PITCH_WAIT_FRACTION) {
            return;
          }
        }
      }

      // console.log("Abs of", intonation, "was within threshold", ADVANCE_THRESHOLD);
      expNoteIdxRef.current = expNoteIndex + 1;
      lastAdvanceTimeRef.current = now;
      pitchBufferRef.current = []; // Reset buffer for next note
    } 

    if (expNoteIdxRef.current < noteTable.length) {
      const beat = noteTable[expNoteIdxRef.current].beat;
      // update beat to move cursor 
      scheduleBeatUpdate(beat); 
    }
  }

  const handleTimePitchUpdate = (estTime: number, freq: number) => {
    let expNoteIndex = expNoteIdxRef.current;
    const noteTable: CSVRow[] = csvDataRef.current;
    
    let targetTime = noteTable[expNoteIndex].refTime;
    
    while (estTime >= targetTime && expNoteIndex < noteTable.length) {
      expNoteIndex += 1;
      expNoteIdxRef.current = expNoteIndex;
      
      targetTime = noteTable[expNoteIndex].refTime;
      console.log(expNoteIndex, noteTable.length);
    }
   
    const targetNote = noteTable[expNoteIdxRef.current];
    const beat = targetNote.beat;
    scheduleBeatUpdate(beat);

    const midi = freq > 0 ? 69 + 12 * Math.log2(freq / 440) : NaN;
    const intonation = calculateIntonation(midi, targetNote);
    
    // silence or no note
    if (Number.isNaN(intonation)) return;

    // update note color of latest attempt
    // console.log("Intonation", intonation);
    const newNoteColor = intonationToNoteColor(intonation, expNoteIndex);
    
    if (noteColorsRef.current[expNoteIndex]?.color !== newNoteColor.color) {
        noteColorsRef.current[expNoteIndex] = newNoteColor;
        dispatch({
            type: "ADD_NOTE_COLOR",
            payload: { color: newNoteColor, index: expNoteIndex },
        });
    }
  } 
  
  function calculateIntonation(detectedMidi: number, targetNote: CSVRow) {
    if (Number.isNaN(detectedMidi)) return NaN;
    const intonation = detectedMidi - targetNote.midi;
    return intonation % 12;
  }

  const testNbnOnce = () => {
    handlePitchUpdate(testInput);
  }

  return (
    <View>
      {/* Show tempo of selected score to be played */}
      {bpm ? (
        <Text style={styles.tempoText}>Reference Tempo: {bpm} BPM</Text>
      ) : null}

      {/* Start Performance button */}
      <TouchableOpacity
        style={[
          styles.button,
          (state.score === "" || state.playing) &&
            styles.disabledButton,
        ]}
        onPress={runPerformance}
        disabled={state.score === "" || state.playing} // Disabled when no score is selected or already playing performance
      >
        <Text style={styles.buttonText}>
          {state.playing ? "Listening..." : "Play"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
           AudioPerformanceModule.stopProcessing();
           dispatch({ type: "start/stop" });
        }}
        disabled={state.score === "" || !state.playing}
      >
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>


      {/* Temporary inputs for testing cursor movement */}
      <TextInput
        value={testInput.toString()}
        onChangeText={(text => setTestInput(parseFloat(text)))}
        keyboardType="numeric"
        placeholder="Frame value"
      />

      <TouchableOpacity 
        style={[
          styles.button,
          (state.score === "" || !state.playing) &&
            styles.disabledButton,
        ]}
        onPress={testNbnOnce}
        disabled={state.score === "" || !state.playing} // Disabled when no score is selected or not playing performance
      >
      <Text style={styles.buttonText}>NBN: Feed Test Frame</Text>
      </TouchableOpacity>
    </View>
  );
}

// Define styles for the components using StyleSheet
const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: "#2C3E50",
    borderRadius: 8,
    alignItems: "center",
  },
  saveButton: {
    marginTop: 8,
    backgroundColor: "#27AE60",
  },
  disabledButton: {
    backgroundColor: "#555",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  status: {
    marginTop: 16,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  tempoText: {
    fontSize: 18,
    color: "#2C3E50",
    fontWeight: "bold",
    // Text shadow properties
    textShadowColor: "rgba(0, 0, 0, 0.1)", // Shadow color with transparency
    textShadowOffset: { width: 1, height: 1 }, // Slight offset
    textShadowRadius: 4,
    textAlign: "left",
    marginBottom: 8,
  },
  hiddenInput: {
    display: "none",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  pickerContainer: {
    flex: 1,
    marginRight: 8,
    minWidth: 0, // allow shrinking so text can ellipsize
  },
  graphContainer: {
    flexShrink: 0, // keep graph its intrinsic size
  },
  fileButton: {
    padding: 12,
    backgroundColor: "#2C3E50",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
    // optional hard cap to be safer:
    maxWidth: 220,
  },
});
