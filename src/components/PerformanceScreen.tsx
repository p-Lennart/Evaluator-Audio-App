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
import { ScoreFollower } from "../audio/ScoreFollower";

interface PerformanceScreenProps {
  score: string; // Selected score name
  dispatch: (action: { type: string; payload?: any }) => void; // Dispatch function used to update global state
  bpm?: number; // Optional BPM number,
  FeaturesCls?: FeaturesConstructor<any>;
  state: any;
}

const BUFFER_SIZE = 5;
const ADVANCE_THRESHOLD = 1;

class FrameBuffer {
  buffer: number[];
  capacity: number;
  size: number;

  constructor(capacity: number) {
    this.buffer = [];
    this.capacity = capacity;
    this.size = 0;
  }

  insert(audioFrame: number[]) {
    this.buffer = this.buffer.concat(audioFrame);
    this.size += 1;
  }

  flush(): number[] {
    const result = this.buffer;
    this.buffer = [];
    this.size = 0;
    return result;
  }
 
  isFull() {
    return this.size >= this.capacity;
  }
}

export default function PerformanceScreen({
  score,
  dispatch,
  bpm = 100,
  FeaturesCls = CENSFeatures,
  state,
}: PerformanceScreenProps) {
  const expNoteIdxRef = useRef<number>(0);
  const frameBufferRef = useRef<FrameBuffer | null>(null);
  const noteColorsRef = useRef<NoteColor[]>([]);
  const csvDataRef = useRef<CSVRow[]>([]); 
  const scoreFollowerRef = useRef<ScoreFollower | null>(null);
  

  const [testInput, setTestInput] = useState<number>(0);

  const runPerformance = async () => {
    console.log("Isplaying=", state.playing, "\nDispatch start/stop");
    dispatch({ type: "start/stop" });
    
    if (!score) return;

    expNoteIdxRef.current = 0;
    frameBufferRef.current = new FrameBuffer(BUFFER_SIZE);
    noteColorsRef.current = [];

    const base = score.replace(/\.musicxml$/, "");
    const csvUri = getScoreCSVData(base);
    const noteTable = await loadCsvInfo(csvUri);
    csvDataRef.current = noteTable; 

    // useMicStream({}, (frame) => processAudioFrame(frame));
  };

  const processAudioFrameNBN = (audioFrame: number[]) => {
    if (!state.playing) {
      return;
    }      

    frameBufferRef.current.insert(audioFrame);
    // keep populating buffer if not full
    console.log("Check if full", frameBufferRef.current.capacity, frameBufferRef.current.size);
    if (!frameBufferRef.current.isFull()) return;

    // flush buffer
    const audioBufferContents = frameBufferRef.current.flush();
    
    // process buffer

    const expNoteIndex = expNoteIdxRef.current;
    const noteTable: CSVRow[] = csvDataRef.current;

    // cap runaway index
    if (expNoteIndex >= noteTable.length) {
      expNoteIdxRef.current = noteTable.length;
      return;
    };

    const targetNote = csvDataRef.current[expNoteIndex];
    const intonation = calcIntonation(audioBufferContents, targetNote);
    
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

      if (expNoteIdxRef.current < noteTable.length) {
        const beat = noteTable[expNoteIdxRef.current].beat;
        // update beat to move cursor 
        dispatch({ type: "SET_ESTIMATED_BEAT", payload: beat }); 
      }
    } 
  }

  const processAudioFrameDTW = (audioFrame: number[]) => {
    let expNoteIndex = expNoteIdxRef.current;
    const noteTable: CSVRow[] = csvDataRef.current;

    // cap runaway index
    if (expNoteIndex >= noteTable.length) {
      expNoteIdxRef.current = noteTable.length;
      return;
    };

    // advance to next unreached note
    let targetTime = csvDataRef.current[expNoteIndex].refTime;
    const estTime = scoreFollowerRef.current.step(audioFrame);

    if (estTime < targetTime) {
      frameBufferRef.current.insert(audioFrame);
      return;
    }

    const prevNoteIndex = expNoteIndex;

    while (estTime >= targetTime) {
      expNoteIndex += 1;
      expNoteIdxRef.current = expNoteIndex;
      targetTime = csvDataRef.current[expNoteIndex].refTime;
    }

    const beat = csvDataRef.current[expNoteIdxRef.current].beat;
    dispatch({ type: "SET_ESTIMATED_BEAT", payload: beat });

    const lastNoteBuffer = frameBufferRef.current.flush();
    const targetNote = csvDataRef.current[prevNoteIndex];
    
    const intonation = calcIntonation(lastNoteBuffer, targetNote);
    
    // silence or no note
    if (Number.isNaN(intonation)) return;

    // update note color of latest attempt
    console.log("Intonation", intonation, intonationToNoteColor(intonation, expNoteIndex), noteColorsRef.current, "state", state.noteColors);
    noteColorsRef.current[expNoteIndex] = intonationToNoteColor(intonation, expNoteIndex);
    dispatch({
        type: "SET_NOTE_COLORS",
        payload: noteColorsRef.current,
    });
  }

  function calcIntonation(frameBuffer: number[], targetNote: CSVRow) {
    console.log("buffer", frameBuffer);
    // temporary test function = mean
    if (frameBuffer.length === 0) return NaN; 
    
    let sum = 0;
    let denom = 0;
    for (let f of frameBuffer) {
      if (Number.isNaN(f)) continue;
      sum += f;
      denom += 1;
    }

    if (denom <= frameBuffer.length * 0.75) return NaN;

    return sum / denom;
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
          (state.score === "" || !state.playing) &&
            styles.disabledButton,
        ]}
        onPress={testNBN}
        disabled={state.score === "" || !state.playing} // Disabled when no score is selected or not playing performance
      >
      <Text style={styles.buttonText}>Feed Test Frame</Text>
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
