import React, { useState, useRef, useEffect, } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";

import { CENSFeatures } from "../audio/FeaturesCENS";
import { FeaturesConstructor } from "../audio/Features";
import { CSVRow, loadCsvInfo } from '../utils/csvParsingUtils';
import { 
  getScoreCSVData,
} from "../score_name_to_data_map/unifiedScoreMap";

import { calculateIntonation, intonationToNoteColor, testIntonation } from "../audio/Intonation";
import { NoteColor } from "../utils/musicXmlUtils";

interface PerformanceScreenProps {
  score: string; // Selected score name
  dispatch: (action: { type: string; payload?: any }) => void; // Dispatch function used to update global state
  bpm?: number; // Optional BPM number,
  FeaturesCls?: FeaturesConstructor<any>;
  state: any;
}

const BUFFER_SIZE = 5;
const ADVANCE_THRESHOLD = 1;

export default function PerformanceScreen({
  score,
  dispatch,
  bpm = 100,
  FeaturesCls = CENSFeatures,
  state,
}: PerformanceScreenProps) {
  const expNoteIdxRef = useRef<number>(0);
  const frameBufferRef = useRef<number[]>([]);
  const noteColorsRef = useRef<NoteColor[]>([]);
  const csvDataRef = useRef<CSVRow[]>([]); 

  const [testInput, setTestInput] = useState<number>(0);

  const runPerformance = async () => {
    console.log("Isplaying=", state.playing, "\nDispatch start/stop");
    dispatch({ type: "start/stop" });
    
    if (!score) return;

    expNoteIdxRef.current = 0;
    frameBufferRef.current = [];
    noteColorsRef.current = [];

    const base = score.replace(/\.musicxml$/, "");
    const csvUri = getScoreCSVData(base);
    const noteTable = await loadCsvInfo(csvUri);
    csvDataRef.current = noteTable; 

    // useMicStream({}, (frame) => processAudioFrameNBN(frame));
  };

  const processAudioFrameNBN = (audioFrame: number[]) => {
    if (!state.playing) {
      return;
    }      

    const expNoteIndex = expNoteIdxRef.current;
    const noteTable: CSVRow[] = csvDataRef.current;

    // cap runaway index
    if (expNoteIndex >= noteTable.length) {
      expNoteIdxRef.current = noteTable.length;
      return;
    };

    frameBufferRef.current = frameBufferRef.current.concat(audioFrame);
  
    // keep populating buffer if not full
    if (frameBufferRef.current.length < audioFrame.length * BUFFER_SIZE) return;

    const targetNote = csvDataRef.current[expNoteIndex];
    const intonation = calcIntonation(frameBufferRef.current, targetNote);
    // flush buffer
    frameBufferRef.current = [];

    // silence or no note
    if (Number.isNaN(intonation)) return;
    
    // update note color of latest attempt
    noteColorsRef.current[expNoteIndex] = intonationToNoteColor(intonation, expNoteIndex);
    dispatch({
        type: "SET_NOTE_COLORS",
        payload: noteColorsRef.current,
    });

    // if attempt within range, advance note
    if (Math.abs(intonation) < ADVANCE_THRESHOLD) {
      expNoteIdxRef.current = expNoteIndex + 1;

      if (expNoteIdxRef.current < noteTable.length) {
        const beat = noteTable[expNoteIdxRef.current].beat; 
        dispatch({ type: "SET_ESTIMATED_BEAT", payload: beat }); // Update beat to move cursor
      }
    } 
  }

  function calcIntonation(frameBuffer: number[], targetNote: CSVRow) {
    // temporary test function = mean
    if (frameBuffer.length === 0) return NaN; 
    return frameBuffer.reduce((prev, current) => prev + current) / frameBuffer.length;
  }

  const testNBN = () => {
    processAudioFrameNBN([testInput]);
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
          // (state.score === "" || state.playing) &&
            // styles.disabledButton,
        ]}
        onPress={testNBN}
        // disabled={state.score === "" || state.playing} // Disabled when no score is selected or already playing performance
      >
      <Text>Feed Test Frame</Text>
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
