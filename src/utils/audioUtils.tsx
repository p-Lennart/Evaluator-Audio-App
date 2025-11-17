import * as waveResampler from "wave-resampler";
const wav = require("node-wav");

/**
 * Converts an array of Float32Array channel data into a single mono Float32Array.
 * If input is already mono (length === 1), returns the channel data unchanged.
 *
 * @param channelData - Array of Float32Array, one per channel
 * @returns A Float32Array containing the mono audio data
 */
export const toMono = (channelData: Float32Array[]): Float32Array => {
  // If already mono, just return the single channel
  if (channelData.length === 1) {
    return channelData[0];
  }

  const numChannels = channelData.length; // e.g., 2 for stereo
  const frameCount = channelData[0].length; // Number of samples per channel
  const mono = new Float32Array(frameCount); // Output buffer for mono audio

  // Loop through each sample frame
  for (let i = 0; i < frameCount; i++) {
    let sum = 0;

    // Sum the sample values from all channels at this frame index
    for (let ch = 0; ch < numChannels; ch++) {
      sum += channelData[ch][i];
    }

    // Average the sum to get the mono value
    mono[i] = sum / numChannels;
  }

  return mono;
};

/**
 * Resamples a Float32Array of audio data from one sample rate to another.
 * If source and target rates are the same, returns the original data.
 *
 * @param audioData - The Float32Array of PCM samples
 * @param srcRate - The original sample rate of the audio data
 * @param destRate - The desired sample rate
 * @returns A Float32Array containing the resampled audio data
 */
export const resampleAudio = (
  audioData: Float32Array,
  srcRate: number,
  destRate: number,
): Float32Array => {
  // If sample rates match, no resampling is needed — return original data
  if (srcRate === destRate) {
    return audioData;
  }

  // Use the waveResampler library to convert between sample rates
  const resampled = waveResampler.resample(audioData, srcRate, destRate);

  // Normalize output to always be Float32Array
  return resampled instanceof Float32Array
    ? resampled
    : Float32Array.from(resampled as number[]);
};

/**
 * Download the first 1000 samples of audioData in Python‑style text format.
 */
// Can ignore these, only used when comparing PCM samples that we were getting from TS vs Python
export function downloadFullPCM(
  audioData: Float32Array,
  filename = "ts_first100_pcm.txt",
): void {
  // Grab the first 1000 samples
  const slice100 = audioData.slice(0, 1000);

  // Format like Python does
  const text = Array.from(slice100).map(pythonFormat).join("\n");

  // Trigger download in browser
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Can ignore these, only used when comparing PCM samples that we were getting from TS vs Python
export function pythonFormat(v: number): string {
  // Python prints "0.0" for zero
  if (Object.is(v, 0)) return "0.0";

  const absV = Math.abs(v);
  const expVal = Math.floor(Math.log10(absV));

  // Python repr/str uses exponential for exp < -4 or exp >= 17
  if (expVal < -4 || expVal >= 17) {
    // Generate a long exponential, then strip unneeded zeros
    let [mant, exp] = v.toExponential(16).split("e");

    // Trim trailing zeros from mantissa, then any stray dot
    mant = mant.replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.$/, "");

    // Normalize exponent sign and pad to 2 digits
    let sign = exp[0];
    let digits = exp.slice(1);
    if (sign !== "+" && sign !== "-") {
      // unlikely, but just in case
      digits = sign + digits;
      sign = "+";
    }
    if (digits.length < 2) digits = "0" + digits;

    return mant + "e" + sign + digits;
  } else {
    // Fixed decimal: JS’s toString gives the shortest fixed repr for 1e‑4 ≤ |v| < 1e17
    return v.toString();
  }
}

export async function prepareAudio(fileUri: string, sampleRate: number) {
  // Fetch the WAV file as ArrayBuffer
  const res = await fetch(fileUri);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch ${fileUri}: ${res.status} ${res.statusText}`,
    );
  }

  const arrayBuffer = await res.arrayBuffer();

  console.log("-- Fetched buffer byteLength=", arrayBuffer.byteLength);

  console.log("-- Decoding WAV…");
  // Decode WAV buffer
  const result = wav.decode(arrayBuffer);
  console.log(
    "-- Decoded channels=",
    result.channelData.length,
    "origSR=",
    result.sampleRate,
  );
  console.log("-- Converting to mono…");

  // Convert to Mono if needed
  let audioData = toMono(result.channelData);
  console.log(`-- Resampling from ${result.sampleRate} → ${sampleRate}…`);

  // Resample if needed
  audioData = resampleAudio(audioData, result.sampleRate, sampleRate);
  console.log("-- Resampled data length=", audioData.length);

  return audioData;
}
