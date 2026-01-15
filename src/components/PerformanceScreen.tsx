import React, { useState, useRef, useEffect, } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";

import { CENSFeatures } from "../audio/FeaturesCENS";
import { FeaturesConstructor } from "../audio/Features";
import { CSVRow, loadCsvInfo } from '../utils/csvParsingUtils';
import { 
  getScoreCSVData,
  getScoreRefAudio,
} from "../score_name_to_data_map/unifiedScoreMap";

import { calculateIntonation, intonationToNoteColor } from '../audio/Intonation';
import { NoteColor } from "../utils/musicXmlUtils";
import { ScoreFollower } from "../audio/ScoreFollower";
import { prepareAudio } from "../utils/audioUtils";
import { PitchDetector } from "pitchy";

interface PerformanceScreenProps {
  score: string; // Selected score name
  dispatch: (action: { type: string; payload?: any }) => void; // Dispatch function used to update global state
  bpm?: number; // Optional BPM number,
  FeaturesCls?: FeaturesConstructor<any>;
  state: any;
}

const ADVANCE_THRESHOLD = 0.2;

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
  
  const [testInput, setTestInput] = useState<number>(0);

  useEffect(() => {
    // const subscription = audioEvents.addListener("onPitchDetected", handlePitchUpdate);

    return () => {
      // subscription.remove();
      // AudioPerformanceModule.stopProcessing();
    };
  }, [dispatch]); 

  const runPerformance = async () => {
    if (!score) return;

    expNoteIdxRef.current = 0;
    noteColorsRef.current = [];

    const base = score.replace(/\.musicxml$/, "");
    const csvUri = getScoreCSVData(base);
    const noteTable = await loadCsvInfo(csvUri);
    csvDataRef.current = noteTable; 

    console.log("Isplaying=", state.playing, "\nDispatch start/stop");
    dispatch({ type: "SET_NOTE_COLORS", payload: [] });
    dispatch({ type: "start/stop" });
  };

  const handlePitchUpdate = (freq: number) => {
    const noteTable: CSVRow[] = csvDataRef.current;
    const expNoteIndex = expNoteIdxRef.current;
    
    if (!noteTable || expNoteIndex >= noteTable.length) return;

    const targetNote = noteTable[expNoteIndex];
    
    const intonation: number = calculateIntonation(freq, targetNote);
    // silence or no note
    if (Number.isNaN(intonation)) return;

    // update note color of latest attempt
    console.log("Intonation", intonation, intonationToNoteColor(intonation, expNoteIndex), noteColorsRef.current, "state", state.noteColors);
    noteColorsRef.current[expNoteIndex] = intonationToNoteColor(intonation, expNoteIndex);
    dispatch({
        type: "SET_NOTE_COLORS",
        payload: noteColorsRef.current,
    });

    // if attempt within range, advance note
    if (Math.abs(intonation) < ADVANCE_THRESHOLD) {
      console.log("Abs of", intonation, "was within threshold", ADVANCE_THRESHOLD);
      expNoteIdxRef.current = expNoteIndex + 1;
    } 

    if (expNoteIdxRef.current < noteTable.length) {
      const beat = noteTable[expNoteIdxRef.current].beat;
      // update beat to move cursor 
      dispatch({ type: "SET_ESTIMATED_BEAT", payload: beat }); 
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
    dispatch({ type: "SET_ESTIMATED_BEAT", payload: beat });

    const intonation = calculateIntonation(freq, targetNote);
    
    // silence or no note
    if (Number.isNaN(intonation)) return;

    // update note color of latest attempt
    console.log("Intonation", intonation, intonationToNoteColor(intonation, expNoteIndex), noteColorsRef.current, "state", state.noteColors);
    noteColorsRef.current[expNoteIndex] = intonationToNoteColor(intonation, expNoteIndex);
    dispatch({
        type: "SET_NOTE_COLORS",
        payload: noteColorsRef.current.filter(Boolean),
    });
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
          {state.playing ? "Running..." : "Play"}
        </Text>
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
