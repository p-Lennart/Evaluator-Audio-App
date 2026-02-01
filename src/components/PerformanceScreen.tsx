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

import { getCurrentUser, savePerformanceData, PerformanceDataNotebyNote } from "../utils/accountUtils";

interface PerformanceScreenProps {
  score: string; // Selected score name
  dispatch: (action: { type: string; payload?: any }) => void; // Dispatch function used to update global state
  bpm?: number; // Optional BPM number,
  FeaturesCls?: FeaturesConstructor<any>;
  state: any;
}

const ADVANCE_THRESHOLD = 0.2;

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

  const [isProcessing, setIsProcessing] = useState(false);
  const [testInput, setTestInput] = useState<number>(0);
  const updateScheduled = useRef<boolean>(false);
  const latestBeat = useRef<number>(0);
  const lastDispatchedBeat = useRef<number | null>(null);

  const [performanceComplete, setPerformanceComplete] = useState(false); // State to determine if plackback of a score is finished or not
  const [performanceSaved, setPerformanceSaved] = useState(false); // State to track if performance has been saved
  
  const performanceMetrics=useRef({//for note by note keep track of
    sharp_ct:0, //# notes initailly sharp/flat
    flat_ct:0,
    tune_time:0,//and avg time to get notes in tune..
    tune_ct:0,
  })

  const noteTracking=useRef<{//also track when notes start/stop for measurements
    [note_ind:number]: {
      initial_time:number;
      started:boolean;
      intune:boolean;
    }
  }>({});

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

    performanceMetrics.current={//initialize values in runPerformance
      sharp_ct:0,
      flat_ct:0,
      tune_time:0,
      tune_ct:0,
    };
    noteTracking.current={};

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

    const noteTable: CSVRow[] = csvDataRef.current;
    const expNoteIndex = expNoteIdxRef.current;
    
    if (!noteTable || expNoteIndex >= noteTable.length) return;

    const targetNote = noteTable[expNoteIndex];
    
    const intonation: number = calculateIntonation(freq, targetNote);
    // silence or no note
    if (Number.isNaN(intonation)) return;

    // update note color of latest attempt
    // console.log("Intonation", intonation, intonationToNoteColor(intonation, expNoteIndex), noteColorsRef.current);
    const newNoteColor = intonationToNoteColor(intonation, expNoteIndex);

    if(!noteTracking.current[expNoteIndex]){
      noteTracking.current[expNoteIndex]={
        initial_time:0,
        started:false,
        intune:false,
      }; 
    }
    const noteState=noteTracking.current[expNoteIndex];
    if(!noteState.started){//if current note just started mark if intial attempt is sharp/flat, then mark as started
      if(intonation>ADVANCE_THRESHOLD) performanceMetrics.current.sharp_ct++;
      else if(intonation<-ADVANCE_THRESHOLD) performanceMetrics.current.flat_ct++;
      noteState.started=true;
      noteState.initial_time=performance.now();
    }
    if(!noteState.intune && Math.abs(intonation) < ADVANCE_THRESHOLD){//then calc time it took to tune
      performanceMetrics.current.tune_time += (performance.now()-noteState.initial_time);
      performanceMetrics.current.tune_ct++;
      noteState.intune=true;
    }

    
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
      // console.log("Abs of", intonation, "was within threshold", ADVANCE_THRESHOLD);
      expNoteIdxRef.current = expNoteIndex + 1;
    } 

    if (expNoteIdxRef.current < noteTable.length) {
      const beat = noteTable[expNoteIdxRef.current].beat;
      // update beat to move cursor 
      scheduleBeatUpdate(beat); 
    }
    else{
      setPerformanceComplete(true)
    }
  }

  const saveCurrentPerformance = async() => {
    const user = await getCurrentUser();
    if (!user) {
      console.log('No user logged in');
      alert('Please log in to save performance data');
      return;
    }
    
    const performanceData: PerformanceDataNotebyNote = {
      id: Date.now().toString(),
      scoreName: score || 'unknown',
      timestamp: new Date().toISOString(),
      tempo: bpm,
      numsharp: performanceMetrics.current.sharp_ct,
      numflat: performanceMetrics.current.flat_ct,
      avgtunetime: performanceMetrics.current.tune_ct>0 ? performanceMetrics.current.tune_time/performanceMetrics.current.tune_ct : 0,
    };
    
    await savePerformanceData(performanceData);
    setPerformanceSaved(true);
    console.log('Performance saved successfully');
    alert('Performance saved successfully!');
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

    const intonation = calculateIntonation(freq, targetNote);
    
    // silence or no note
    if (Number.isNaN(intonation)) return;

    // update note color of latest attempt
    // console.log("Intonation", intonation);
    const newNoteColor = intonationToNoteColor(intonation, expNoteIndex);
    
    // Check if color actually changed to avoid unnecessary re-renders/bridge traffic
    if (noteColorsRef.current[expNoteIndex]?.color !== newNoteColor.color) {
        noteColorsRef.current[expNoteIndex] = newNoteColor;
        dispatch({
            type: "ADD_NOTE_COLOR",
            payload: { color: newNoteColor, index: expNoteIndex },
        });
    }
  } 
  function calculateIntonation(freq: number, targetNote: CSVRow) {
    if (freq < 0) {
      return NaN;
    }

    const midi = 69 + 12 * Math.log2(freq / 440);
    const intonation = targetNote.midi - midi;

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

      {/* Save Performance button */}
            <TouchableOpacity
              style={[
                styles.button,
                styles.saveButton,
                (!performanceComplete || performanceSaved) && styles.disabledButton,
              ]}
              onPress={saveCurrentPerformance}
              disabled={!performanceComplete || performanceSaved}
            >
              <Text style={styles.buttonText}>
                {performanceSaved ? "Performance Saved ✓" : "Save Performance"}
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
