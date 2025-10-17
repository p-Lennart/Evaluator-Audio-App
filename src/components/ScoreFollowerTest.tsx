// # The MIT License (MIT)

// Copyright (c) 2016 PART <info@gordonlesti.com>, <https://fheyen.github.io/>

// > Permission is hereby granted, free of charge, to any person obtaining a copy
// > of this software and associated documentation files (the "Software"), to deal
// > in the Software without restriction, including without limitation the rights
// > to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// > copies of the Software, and to permit persons to whom the Software is
// > furnished to do so, subject to the following conditions:
// >
// > The above copyright notice and this permission notice shall be included in
// > all copies or substantial portions of the Software.
// >
// > THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// > IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// > FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// > AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// > LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// > OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// > THE SOFTWARE.

import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Audio, AVPlaybackStatus } from "expo-av";
import { decode } from "wav-decoder";
import { ScoreFollower } from "../audio/ScoreFollower";
import { CENSFeatures } from "../audio/FeaturesCENS";
import { FeaturesConstructor } from "../audio/Features";
import { Platform } from "react-native";
import { Asset } from "expo-asset";
import TempoGraph from "./TempoGraph";
import { resampleAudio, toMono } from "../utils/audioUtils";
import {
  calculateWarpedTimes,
  computeOfflineAlignmentPath,
  precomputeAlignmentPath,
} from "../utils/alignmentUtils";
import {
  LiveFile,
  parseWebWavFile,
  pickMobileWavFile,
} from "../utils/fileSelectorUtils";
import { loadCsvInfo } from "../utils/csvParsingUtils";
import { refAssetMap } from "../score_name_to_data_map/scoreToCsvMap";
import { csvAssetMap } from "../score_name_to_data_map/scoreToWavMap";
import { startTimer, endTimer } from "../utils/Profiler";
import { initOsmdWeb, resetCursor } from "../utils/osmdUtils";

interface ScoreFollowerTestProps {
  score: string; // Selected score name
  dispatch: (action: { type: string; payload?: any }) => void; // Dispatch function used to update global state
  bpm?: number; // Optional BPM number,
  FeaturesCls?: FeaturesConstructor<any>;
  state: any;
}

interface CSVRow {
  // Interface used to store CSV info
  beat: number; // Start beat value of current row's note
  refTime: number; // Reference audio timestamp of when current row's note will be played
  liveTime: number; // Live audio timestamp of when current row's note will be played - used for testing purposes only
  predictedTime: number; // Estimated live audio timestamp of when current row's note will be played
}

// Constant for how many seconds to rewind
const BACKWARD_SKIP_SECONDS = 5;

export default function ScoreFollowerTest({
  score,
  dispatch,
  bpm = 100, // Default BPM if not provided in props
  FeaturesCls = CENSFeatures,
  state,
}: ScoreFollowerTestProps) {
  const [liveFile, setLiveFile] = useState<LiveFile | null>(null);
  const nextIndexRef = useRef<number>(0); // Track next CSV index to dispatch
  const soundRef = useRef<Audio.Sound | null>(null); // Reference to Audio Component
  const followerRef = useRef<ScoreFollower | null>(null); // Reference to score follower instance
  const audioDataRef = useRef<Float32Array>(new Float32Array()); // Reference to decoded audio sample data
  const pathRef = useRef<[number, number][]>([]); // Reference to alignment path
  const inputRef = useRef<HTMLInputElement>(null); // Reference to the file select HTML element
  const frameSecRef = useRef<number>(0); // Reference to duration of each frame in seconds
  const csvDataRef = useRef<CSVRow[]>([]); // Array that contains CSV rows (CSV row == info on a note in a selected score)
  const [warpingPath, setWarpingPath] = useState<[number, number][]>([]); // State to store warping path when computed
  const [frameSize, setFrameSize] = useState<number>(0); // State to store frame size of score follower
  const [sampleRate, setSampleRate] = useState<number>(0); // State to store sample rate of score follower
  const [performanceComplete, setPerformanceComplete] = useState(false); // State to determine if plackback of a score is finished or not
  const isWeb = Platform.OS === "web"; // Boolean indicating if user is on website version or not

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    // Callback to handle audio playback status updates
    if (!status.isLoaded) return; // Exit early if sound isn't loaded
    const currentTimeSec = status.positionMillis / 1000;

    while (
      // Process only if the frame is within bounds and we have passed a predicted time of current csv row
      nextIndexRef.current < csvDataRef.current.length &&
      currentTimeSec >= csvDataRef.current[nextIndexRef.current].predictedTime
    ) {
      const beat = csvDataRef.current[nextIndexRef.current].beat; // Get beat of that note
      dispatch({ type: "SET_ESTIMATED_BEAT", payload: beat }); // Update beat to move cursor
      nextIndexRef.current++;
    }

    // End of playback
    if (status.didJustFinish) {
      dispatch({ type: "start/stop" });
      setPerformanceComplete(true);
      dispatch({ type: "SET_ESTIMATED_BEAT", payload: 0 });
      nextIndexRef.current = 0; // Reset index ref
      soundRef.current?.setOnPlaybackStatusUpdate(null);
    }
  };

  // Unload the sound when the component unmounts to free up memory
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {});
      }
    };
  }, []);

  // Web versin of wav file upload
  function onWebChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = parseWebWavFile(e);
    setLiveFile(file);
  }
  // Mobile version of wav file upload using DocumentPicker
  async function onMobilePress() {
    const file = await pickMobileWavFile();
    setLiveFile(file);
  }

  const restartSong = async () => {
    // Only allow restart if a performance is currently loaded
    if (!soundRef.current || !csvDataRef.current.length) return;
    dispatch({ type: "RESET_SCORE" }); // Reset global state
    try {
      const status = await soundRef.current.getStatusAsync();
      if (!status.isLoaded) return;

      const wasPlaying = status.isPlaying;
      soundRef.current.setOnPlaybackStatusUpdate(null);

      // Reset
      await soundRef.current.setPositionAsync(0);

      nextIndexRef.current = 0;
      dispatch({ type: "SET_ESTIMATED_BEAT", payload: 0 });
      setPerformanceComplete(false); // Reset flag

      if (wasPlaying) {
        await soundRef.current.playAsync();
      } else {
        await soundRef.current.pauseAsync();
      }

      soundRef.current.setOnPlaybackStatusUpdate(handlePlaybackStatusUpdate);

      console.log(`-- Restarted song from 0s. Beat: 0`);
    } catch (err) {
      console.error("Restart Song Error:", err);
      if (soundRef.current) {
        soundRef.current.setOnPlaybackStatusUpdate(handlePlaybackStatusUpdate);
      }
    }
  };

  const skipBackward = async () => {
    if (!soundRef.current || !csvDataRef.current.length) return;

    try {
      // Get the current position
      const status = await soundRef.current.getStatusAsync();
      if (!status.isLoaded) return;

      const wasPlaying = status.isPlaying;

      soundRef.current.setOnPlaybackStatusUpdate(null);

      const currentPositionSec = status.positionMillis / 1000;
      let targetTimeSec = Math.max(
        0,
        currentPositionSec - BACKWARD_SKIP_SECONDS
      );

      const targetTimeMillis = Math.round(targetTimeSec * 1000);
      await soundRef.current.setPositionAsync(targetTimeMillis);

      let targetIndex = 0;
      let targetBeat = 0;

      for (let i = 0; i < csvDataRef.current.length; i++) {
        const row = csvDataRef.current[i];
        if (targetTimeSec >= row.predictedTime) {
          targetIndex = i + 1;
          targetBeat = row.beat;
        } else {
          break;
        }
      }

      nextIndexRef.current = targetIndex;
      dispatch({ type: "SET_ESTIMATED_BEAT", payload: targetBeat });
      setPerformanceComplete(false); //

      if (wasPlaying) {
        await soundRef.current.playAsync();
      }

      soundRef.current.setOnPlaybackStatusUpdate(handlePlaybackStatusUpdate);

      console.log(
        // TODO: Add SVGs for icons - Jiaming
        `-- Skipped backward to ${targetTimeSec.toFixed(2)}s. Next index: ${targetIndex}, Beat: ${targetBeat}`
      );
    } catch (err) {
      console.error("Skip Backward Error:", err);
      if (soundRef.current) {
        soundRef.current.setOnPlaybackStatusUpdate(handlePlaybackStatusUpdate);
      }
    }
  };

  const runFollower = async () => {
    if (!score) return; // Do nothing if no score is selected

    const base = score.replace(/\.musicxml$/, ""); // Retrieve score name (".musicxml" removal)

    // Handle Pause/Stop
    if (state.playing && soundRef.current) {
      // If currently playing, we pause it
      await soundRef.current.pauseAsync();
      dispatch({ type: "start/stop" });
      return;
    }

    // Handle Resume (if sound is loaded but paused)
    if (!state.playing && soundRef.current) {
      const status = await soundRef.current.getStatusAsync();
      if (
        status.isLoaded &&
        status.positionMillis > 0 &&
        !status.didJustFinish
      ) {
        // If loaded and mid-song, resume playback
        await soundRef.current.playAsync();
        dispatch({ type: "start/stop" });
        return;
      }
    }

    // New run/initialization flow:
    dispatch({ type: "start/stop" }); // Toggle playing boolean (to true in this case)
    dispatch({ type: "toggle_loading_performance" }); // Toggle loading boolean (to true in this case)
    setPerformanceComplete(false); // Set performance complete boolean to false
    nextIndexRef.current = 0; // Reset index for a fresh start
    dispatch({ type: "SET_ESTIMATED_BEAT", payload: 0 }); // Reset cursor to the start

    try {
      const refUri = isWeb
        ? `/${base}/baseline/instrument_0.wav`
        : Asset.fromModule(refAssetMap[base]).uri; // Path to reference wav file of selected score depending on web or expo go version

      console.log("-- Creating ScoreFollower...");
      followerRef.current = await ScoreFollower.create(refUri, FeaturesCls); // Initialize score follower instance (default parameters from ScoreFollower.tsx)
      console.log("-- ScoreFollower created");

      const follower = followerRef.current!;
      const refFeatures = follower.ref.featuregram; // Get reference features from follower instance

      // Extract and set sample rate and window length from the ScoreFollower instance
      const { sr, winLen } = follower;
      setSampleRate(sr);
      setFrameSize(winLen);

      const frameSize = winLen; // Set framesize to window length property of scorefollower
      const sampleRate = sr; // Set sampleRate property of scorefollower
      frameSecRef.current = frameSize / sampleRate; // Duration of each frame in seconds

      let buffer: ArrayBuffer; // Define an array buffer

      console.log("-- Loading live audio buffer...");
      buffer = await fetch(liveFile.uri).then((r) => r.arrayBuffer()); // Web and mobile version of initializing array buffer given live uri
      console.log("-- Buffer loaded, byteLength=", buffer.byteLength);

      console.log("-- Decoding WAV buffer...");
      const result = await decode(buffer, { symmetric: true }); // Decode the WAV buffer into PCM audio data  - passed in symmetric = TRUE for better PCM samples when compared to the Python version
      console.log(
        "-- Decoded: channels=",
        result.channelData.length,
        "origSR=",
        result.sampleRate
      );

      startTimer("(3) Preparing live audio data");
      let audioData = toMono(result.channelData); // Convert these PCM audio data to mono if needed
      audioData = resampleAudio(audioData, result.sampleRate, sampleRate); // Resample the resulting audio data if needed
      audioDataRef.current = audioData;
      console.log("-- Audio data prepared, length=", audioData.length);
      endTimer("(3) Preparing live audio data");

      startTimer("(4) Computing alignment path");
      console.log("-- Computing alignment path...");
      pathRef.current = precomputeAlignmentPath(audioData, frameSize, follower); // Compute alignment path
      console.log("-- Alignment path length=", pathRef.current.length);
      endTimer("(4) Computing alignment path");

      // downloadFullPCM(audioDataRef.current)

      {
        console.log("-- precompute CSV block: score=", score, "→ base=", base);
        const csvUri = isWeb
          ? `/${base}/baseline/aotgs_solo_100bpm.csv`
          : Asset.fromModule(csvAssetMap[base]).uri; // Path the CSV given score name (web and alternative expo go version)
        console.log("-- CSV URI =", csvUri);

        console.log("-- Calling loadCsvInfo(csvUri, isWeb=", isWeb, ")…");
        const rows = await loadCsvInfo(csvUri); // Obtain rarray of csv rows (info on each note of score such as beat value, ref time when note is played, etc.)
        console.log("-- Loaded CSV rows count =", rows.length);

        csvDataRef.current = rows; // Save the parsed CSV rows for downstream use

        const stepSize = frameSecRef.current; // Duration of each frame in seconds
        const warpingPath = pathRef.current; // The Dynamic Time Warping path: an array of [referenceIndex, liveIndex] pairs
        const refTimes = csvDataRef.current.map((r) => r.refTime); // Pull out just the reference times from each row to feed into the calculateWarpedTimes()

        const predictedTimes = calculateWarpedTimes(
          // Obtain array of ESTIMATED timestamps of when each note is played in the live audio
          warpingPath,
          stepSize,
          refTimes
        );

        // Update CSV Interface with predicted live times for each note
        csvDataRef.current = csvDataRef.current.map((row, i) => ({
          ...row,
          predictedTime: predictedTimes[i],
        }));
      }

      console.log(pathRef.current); // Show full path
      setWarpingPath(pathRef.current); // Save warping path in local "warpingPath" state

      // If sound is already loaded and we just re-run, need to unload
      if (soundRef.current) {
        soundRef.current.setOnPlaybackStatusUpdate(null);
        await soundRef.current.unloadAsync();
      }

      const soundSource = { uri: liveFile.uri }; // Extract live wav file's uri
      dispatch({ type: "toggle_loading_performance" }); // Toggle loading boolean (to false in this case)

      // Create and load the sound object from the live audio URI
      const { sound } = await Audio.Sound.createAsync(
        soundSource, // Pass in the live wav file's uri as argument
        {
          shouldPlay: true, // Automatically start playback once loaded
          progressUpdateIntervalMillis: 20, // Set how often status updates are triggered
        },
        handlePlaybackStatusUpdate // Use the external function as the callback
      );
      soundRef.current = sound;
    } catch (err) {
      console.error("ScoreFollower Error:", err);
      // Ensure playing state is toggled off if an error occurs
      if (state.playing) {
        dispatch({ type: "start/stop" });
      }
      dispatch({ type: "toggle_loading_performance" });
    }
  };

  return (
    <View>
      {/* Show tempo of selected score to be played */}
      {bpm ? (
        <Text style={styles.tempoText}>Reference Tempo: {bpm} BPM</Text>
      ) : null}

      <View style={styles.row}>
        {/* Web version of wav file upload */}
        <View style={styles.pickerContainer}>
          {Platform.OS === "web" ? (
            <>
              <input
                ref={inputRef}
                type="file"
                accept=".wav"
                style={styles.hiddenInput}
                disabled={state.playing}
                onChange={onWebChange}
              />
              <TouchableOpacity
                style={[
                  styles.fileButton,
                  state.playing && styles.disabledButton,
                ]}
                onPress={() => inputRef.current?.click()}
                disabled={state.playing}
              >
                {/* Display wav file name on button */}
                <Text
                  style={styles.buttonText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {liveFile
                    ? `Selected: ${liveFile.name}`
                    : "Upload a Performance"}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            /* Mobile version of wav file upload */
            <TouchableOpacity
              style={[
                styles.fileButton,
                state.playing && styles.disabledButton,
              ]}
              onPress={onMobilePress}
              disabled={state.playing}
            >
              {/* Display wav file name on button */}
              <Text
                style={styles.buttonText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {liveFile ? `Selected: ${liveFile.name}` : "Select WAV File"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Display Tempo Graph button */}
        <View style={styles.graphContainer}>
          <TempoGraph
            refTempo={bpm} // Pass in ref tempo of score for calculation
            beatsPerMeasure={state.beatsPerMeasure} // Pass in global beatPerMeasure state for calculation
            warpingPath={warpingPath} // Pass in computed warping path for calculation
            scoreName={score.replace(/\.musicxml$/, "")} // Selected score name
            disabled={!performanceComplete || liveFile == null} // Disable if we are in a performance or no wav file was uploaded
            frameSize={frameSize} // Pass frame size for calculation
            sampleRate={sampleRate} // Pass in sample rate for calculation
          />
        </View>
      </View>

      {/* Playback Controls Row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
          marginTop: 4,
        }}
      >
        {/* Restart Button */}
        <TouchableOpacity
          style={[
            styles.playbackButton,
            (!liveFile || state.loadingPerformance) && styles.disabledButton,
            { marginRight: 8 },
          ]}
          onPress={restartSong}
          disabled={!liveFile || state.loadingPerformance}
        >
          <Text style={styles.buttonText}>🔄</Text>
        </TouchableOpacity>

        {/* Rewind Button */}
        {/* <TouchableOpacity
          style={[
            styles.playbackButton,
            (!liveFile || !state.playing || state.loadingPerformance) &&
              styles.disabledButton,
            { marginRight: 8 },
          ]}
          onPress={skipBackward}
          disabled={!liveFile || !state.playing || state.loadingPerformance}
        >
          <Text style={styles.buttonText}>⏪ {BACKWARD_SKIP_SECONDS}s</Text>
        </TouchableOpacity> */}

        {/* Start/Pause Performance button */}
        <TouchableOpacity
          style={[
            styles.playbackButton,
            (state.score === "" || !liveFile || state.loadingPerformance) &&
              styles.disabledButton,
            { flexGrow: 1, marginRight: 0 },
          ]}
          onPress={runFollower}
          disabled={state.score === "" || !liveFile || state.loadingPerformance}
        >
          <Text style={styles.buttonText}>
            {state.playing ? "Pause" : "Play"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Define styles for the components using StyleSheet
const styles = StyleSheet.create({
  playbackButton: {
    padding: 12,
    backgroundColor: "#2C3E50",
    borderRadius: 8,
    alignItems: "center",
    flexShrink: 0,
    minWidth: 80,
  },
  button: {
    padding: 12,
    backgroundColor: "#2C3E50",
    borderRadius: 8,
    alignItems: "center",
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
    // marginBottom: 8,
    // optional hard cap to be safer:
    maxWidth: 220,
  },
});
