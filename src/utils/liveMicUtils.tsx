import { Platform } from "react-native";
import { CENSFeatures } from "../audio/FeaturesCENS";
import { ExpoMicProcessor } from "../audio/ExpoMicProcessor";

let audioCtx: AudioContext | null = null; // Declare a reference to the AudioContext, which manages all audio processing
let micStream: MediaStream | null = null; // Declare a reference to the MediaStream from the user's microphone

/**
 * Initialize **web** microphone capture and chroma extraction via an AudioWorklet.
 *
 * @param setChroma - Callback to receive each computed chroma vector (length depends on CENSFeatures config).
 * @param chromaMaker - Instance of CENSFeatures used to compute chroma from PCM audio frames.
 * @returns Promise<void> that resolves after worklet wiring is complete (or logs an error if initialization fails).
 */
export const initWebAudio = async (
  setChroma: (vec: number[]) => void,
  chromaMaker: CENSFeatures,
) => {
  try {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true }); // Request access to user's microphone
    audioCtx = new AudioContext(); // Create a new AudioContext for audio processing
    await audioCtx.audioWorklet.addModule("./utils/mic-processor.js"); // Load the custom AudioWorkletProcessor
    const source = audioCtx.createMediaStreamSource(micStream); // Create a source node from the microphone stream
    const workletNode = new AudioWorkletNode(audioCtx, "mic-processor"); // Create an AudioWorkletNode linked to our custom 'mic-processor'
    source.connect(workletNode); // Connect the mic source to the worklet
    workletNode.connect(audioCtx.destination); // connect worklet to output

    // Handle incoming audio chunks from the worklet
    workletNode.port.onmessage = async (event) => {
      const audioChunk = event.data as number[];
      try {
        // Extract chroma features and update state
        const chromaResult = await chromaMaker.insert(audioChunk);
        setChroma(chromaResult);
      } catch (e) {
        console.error("Chroma extraction error:", e);
      }
    };
  } catch (err) {
    console.error("Failed to initialize audio:", err);
  }
};

/**
 * Initialize **native/mobile** microphone capture and chroma extraction using ExpoMicProcessor.
 *
 * @param setChroma - Callback to receive each computed chroma vector from the live mic.
 * @param processor - An initialized ExpoMicProcessor that emits PCM buffers and controls start/stop.
 * @param chromaMaker - Instance of CENSFeatures used to compute chroma from PCM audio frames.
 * @returns Promise<void> that resolves once recording has started (or logs if initialization fails).
 */
export const initNativeAudio = async (
  setChroma: (vec: number[]) => void,
  processor: ExpoMicProcessor,
  chromaMaker: CENSFeatures,
) => {
  try {
    await processor.init(); // ExpoMicProcessor intialization

    processor.onmessage = async ({ data }) => {
      // Once we get buffer of size 4096
      const vec = await chromaMaker.insert(Array.from(data)); // Insert with ChromaMaker to get chroma vector
      setChroma(vec); // Set chroma vector
    };

    await processor.start(); // Start recording
  } catch (err) {
    console.error("Failed to initialize Native audio:", err);
  }
};

/**
 * Stop live audio capture and tear down resources.
 *
 * @param processor - The ExpoMicProcessor instance (ignored on web).
 * @returns void
 */
export const stopLiveAudio = (processor: ExpoMicProcessor) => {
  if (Platform.OS === "web") {
    if (micStream) {
      micStream.getTracks().forEach((t) => t.stop()); // Stop each MediaStream track from the mic

      micStream = null;
    }
    if (audioCtx) {
      audioCtx.close(); // Close the Web Audio API context to release audio resources
      audioCtx = null;
    }
  } else {
    if (processor) {
      processor.stop(); // On native, stop the Expo microphone processor
    }
  }
};
