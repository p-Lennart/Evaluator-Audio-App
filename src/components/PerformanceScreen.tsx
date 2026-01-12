import React, { useState, useRef, useEffect, } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";

import { CENSFeatures } from "../audio/FeaturesCENS";
import { FeaturesConstructor } from "../audio/Features";
import { CSVRow, loadCsvInfo } from '../utils/csvParsingUtils';
import { 
  getScoreCSVData,
  getScoreRefAudio,
} from "../score_name_to_data_map/unifiedScoreMap";

import { intonationToNoteColor } from "../audio/Intonation";
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

const BUFFER_SIZE = 5;
const ADVANCE_THRESHOLD = 0.2;

class test_FrameBuffer {
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
  const frameBufferRef = useRef<test_FrameBuffer | null>(null);
  const noteColorsRef = useRef<NoteColor[]>([]);
  const csvDataRef = useRef<CSVRow[]>([]); 
  const scoreFollowerRef = useRef<ScoreFollower | null>(null);
  

  const [testInput, setTestInput] = useState<number>(0);

  const runPerformance = async () => {
    if (!score) return;

    expNoteIdxRef.current = 0;
    frameBufferRef.current = new test_FrameBuffer(BUFFER_SIZE);
    noteColorsRef.current = [];

    const base = score.replace(/\.musicxml$/, "");
    const csvUri = getScoreCSVData(base);
    const noteTable = await loadCsvInfo(csvUri);
    csvDataRef.current = noteTable; 

    const isNbn = true;
    if (!isNbn) {
      // Use unified mapping for cross-platform file access
      const refUri = getScoreRefAudio(base);
      scoreFollowerRef.current = await ScoreFollower.create(refUri, CENSFeatures); // Initialize score follower
    }

    dispatch({
        type: "SET_NOTE_COLORS",
        payload: [],
    });

    console.log("Isplaying=", state.playing, "\nDispatch start/stop");
    dispatch({ type: "start/stop" });
    
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

    const targetNote = noteTable[expNoteIndex];
    const intonation = test_dummy_calcIntonation(audioBufferContents, targetNote);
    
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

  const processAudioFrameDTW = (audioFrame: number[]) => {
    if (!state.playing) {
      return;
    }
    
    let expNoteIndex = expNoteIdxRef.current;
    const noteTable: CSVRow[] = csvDataRef.current;

    // cap runaway index
    if (expNoteIndex >= noteTable.length) {
      expNoteIdxRef.current = noteTable.length;
      dispatch({ type: "start/stop" }); // stop
      return;
    };

    // advance to next unreached note
    let targetTime = noteTable[expNoteIndex].refTime;
    const estTime = scoreFollowerRef.current.step(audioFrame);

    if (estTime < targetTime) {
      frameBufferRef.current.insert(audioFrame);
      return;
    }

    const prevNoteIndex = expNoteIndex;

    while (estTime >= targetTime && expNoteIndex < noteTable.length) {
      expNoteIndex += 1;
      expNoteIdxRef.current = expNoteIndex;
      targetTime = noteTable[expNoteIndex].refTime;
      console.log(expNoteIndex, noteTable.length);
    }

    const beat = noteTable[expNoteIdxRef.current].beat;
    dispatch({ type: "SET_ESTIMATED_BEAT", payload: beat });

    const lastNoteBuffer = frameBufferRef.current.flush();
    const targetNote = noteTable[prevNoteIndex];

    const intonation = test_calcIntonation(lastNoteBuffer, targetNote);
    
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

  function test_calcIntonation(frameBuffer: number[], targetNote: CSVRow) {
    if (frameBuffer.length < 2) {
      return NaN;
    }

    const mcleod = PitchDetector.forNumberArray(frameBuffer.length);
    const [mcleodFrequency, mcleodFrequencyClarity] = mcleod.findPitch(
      frameBuffer,
      44100,
    );
    
    if (mcleodFrequency < 0) {
      return NaN;
    }

    const midi = 69 + 12 * Math.log2(mcleodFrequency / 440);
    const intonation = targetNote.midi - midi;

    return intonation % 12;
}

function test_dummy_calcIntonation(frameBuffer: number[], targetNote: CSVRow) {
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

  const testNbnOnce = () => {
    processAudioFrameNBN([testInput]);
  }

  const testDtwFull = async () => {

    const base = score.replace(/\.musicxml$/, "");
    const refUri = getScoreRefAudio(base);

    const audioData = await prepareAudio(refUri, 44100);

    const HOP = 4096;
    const FRAME = 4096;
  
    await testProcessAudioFrames(audioData, FRAME, HOP, (frame, index) => {
      processAudioFrameDTW(frame);
    });
  }

  const testNbnFull = async () => {

    const base = score.replace(/\.musicxml$/, "");
    const refUri = getScoreRefAudio(base);

    const audioData = await prepareAudio(refUri, 44100);

    const HOP = 4096;
    const FRAME = 4096;
  
    await testProcessAudioFrames(audioData, FRAME, HOP, (frame, index) => {
      // console.log("Frame", index);
      processAudioFrameNBN(frame);
    });
  }

  async function testProcessAudioFrames(
    audioData: Float32Array,
    frameSize: number,
    hopSize: number,
    onFrame: (frame: number[], frameIndex: number) => void
  ) {
    const totalSamples = audioData.length;
    let frameIndex = 0;

    // Iterate frame-by-frame
    for (let start = 0; start + frameSize <= totalSamples; start += hopSize) {
      const frameView = audioData.subarray(start, start + frameSize);
      // temporary inefficient requirement: convert Float32Array -> number[]
      const frameAsNumberArray = Array.from(frameView);

      onFrame(frameAsNumberArray, frameIndex);
      frameIndex++;

      await new Promise(r => setTimeout(r, 100)); // tmp delay for debugging
    }
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
      <TouchableOpacity 
        style={[
          styles.button,
          (state.score === "" || !state.playing) &&
            styles.disabledButton,
        ]}
        onPress={testNbnFull}
        disabled={state.score === "" || !state.playing} // Disabled when no score is selected or not playing performance
      >
      <Text style={styles.buttonText}>NBN: Feed all audio frames</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[
          styles.button,
          (state.score === "" || !state.playing) &&
            styles.disabledButton,
        ]}
        onPress={testDtwFull}
        disabled={state.score === "" || !state.playing} // Disabled when no score is selected or not playing performance
      >
      <Text style={styles.buttonText}>DTW: Feed all audio frames</Text>
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
