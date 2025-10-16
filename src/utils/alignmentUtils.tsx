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

import { FeaturesConstructor } from "../audio/Features";
import { ScoreFollower } from "../audio/ScoreFollower";
import { dot } from "../audio/FeaturesCENS";
import DynamicTimeWarping from "dynamic-time-warping-ts";
import { RefreshControl } from "react-native";

/**
 * Given a DTW warping path and reference audio timestamps, compute estimated live audio timestamps.
 *
 * @param warpingPath - Array of [refFrameIndex, liveFrameIndex] pairs from dynamic time warping
 * @param stepSize - Duration of each frame in seconds
 * @param refTimes - Array of reference audio timestamps (in seconds)
 * @returns Array of estimated live audio timestamps aligned to the reference
 *
 * Optional:
 * - enforceNonDecreasing: if true, clamps output so it never goes below the previous value (default: true)
 * - debug: if true, prints helpful diagnostic logs
 */
export const calculateWarpedTimes = (
  warpingPath: number[][],
  stepSize: number,
  refTimes: number[],
  enforceNonDecreasing = true,
  debug = false
): number[] => {
  if (!warpingPath || warpingPath.length === 0) return refTimes.map(() => 0);

  // Build arrays of path times (seconds)
  const pathTimes = warpingPath.map(
    ([refIdx, liveIdx]) => [refIdx * stepSize, liveIdx * stepSize] as [number, number],
  );
  const refPathTimes = pathTimes.map((p) => p[0]);
  const livePathTimes = pathTimes.map((p) => p[1]);

  const n = refPathTimes.length;
  const eps = Number.EPSILON * 1e3; // small tolerance for equality comparisons
  const warped: number[] = [];

  // Pointer into path that we advance monotonically as refTimes increase.
  // We'll ensure pointer i points to the left index (or 0 initially).
  let i = 0;

  for (const q of refTimes) {
    // If query is before or equal first path time, snap to first
    if (q <= refPathTimes[0] + eps) {
      const t = livePathTimes[0];
      const clamped = (enforceNonDecreasing && warped.length && t < warped[warped.length - 1] - eps)
        ? warped[warped.length - 1]
        : t;
      if (debug) console.log('Q before first path time', q, '->', clamped);
      warped.push(clamped);
      continue;
    }

    // Advance pointer while the next refPathTime is still < q
    while (i < n - 1 && refPathTimes[i + 1] < q - eps) {
      i++;
    }

    // If we've reached the end, snap to last
    if (i >= n - 1) {
      const t = livePathTimes[n - 1];
      const clamped = (enforceNonDecreasing && warped.length && t < warped[warped.length - 1] - eps)
        ? warped[warped.length - 1]
        : t;
      if (debug) console.log('Q past last path time', q, '->', clamped);
      warped.push(clamped);
      continue;
    }

    // Now i is such that refPathTimes[i] <~ q <= refPathTimes[i+1]
    const leftIdx = i;
    const rightIdx = i + 1;

    const leftRefT = refPathTimes[leftIdx];
    const rightRefT = refPathTimes[rightIdx];
    const leftLiveT = livePathTimes[leftIdx];
    const rightLiveT = livePathTimes[rightIdx];

    const denom = rightRefT - leftRefT;

    let tCandidate: number;

    if (Math.abs(denom) <= eps) {
      // Plateau in ref axis: find the rightmost index of this plateau and use its live time.
      let plateauRight = rightIdx;
      while (plateauRight + 1 < n && Math.abs(refPathTimes[plateauRight + 1] - leftRefT) <= eps) {
        plateauRight++;
      }
      tCandidate = livePathTimes[plateauRight];
      if (debug) {
        console.log('Plateau handling', { q, leftIdx, rightIdx, plateauRight, leftRefT, tCandidate });
      }
    } else {
      // Normal linear interpolation between left and right path points using actual denom
      const frac = (q - leftRefT) / denom;
      tCandidate = leftLiveT + frac * (rightLiveT - leftLiveT);
      if (debug) {
        console.log('Interp', { q, leftIdx, rightIdx, leftRefT, rightRefT, frac, leftLiveT, rightLiveT, tCandidate });
      }
    }

    // Optional clamp to avoid the warped times going backwards (monotonic smoothing).
    if (enforceNonDecreasing && warped.length > 0) {
      const prev = warped[warped.length - 1];
      if (tCandidate < prev - eps) {
        if (debug) {
          console.log('Clamping to preserve monotonicity', { prev, tCandidate, q, leftIdx, rightIdx });
        }
        tCandidate = prev;
      }
    }

    warped.push(tCandidate);
  }

  return warped;
};

/**
 * Computes the full dynamic time warping alignment path for the given audio data.
 *
 * @param audioData - Mono PCM audio data as Float32Array
 * @param frameSize - Number of samples per frame (window length)
 * @param follower - Initialized ScoreFollower instance
 * @returns An array of [refFrameIndex, liveFrameIndex] pairs representing the alignment path
 */
export const precomputeAlignmentPath = (
  audioData: Float32Array,
  frameSize: number,
  follower: ScoreFollower,
): [number, number][] => {
  const totalFrames = Math.ceil(audioData.length / frameSize); // Total number of frames we need to process to cover the audio buffer
  console.log(
    `precomputeAlignmentPath: totalFrames = ${totalFrames}, frameSize = ${frameSize}`,
  );
  const path: [number, number][] = []; // Holds the mapping between reference and live frame indices

  // Process each frame of audio
  for (let i = 0; i < totalFrames; i++) {
    // Slice the next frame of audio data
    const start = i * frameSize;
    let frame = audioData.subarray(start, start + frameSize);

    // Pad the frame if it's shorter than expected
    if (frame.length < frameSize) {
      const pad = new Float32Array(frameSize);
      pad.set(frame);
      frame = pad;
    }
    // Step the ScoreFollower with this frame
    // This updates the follower's internal path and returns an estimated time in seconds
    console.log(`    Calling follower.step() on frame ${i}`);
    const timeSec = follower.step(Array.from(frame));
    console.log(`    -- step returned timeSec = ${timeSec.toFixed(3)}s`);

    const last = follower.path[follower.path.length - 1] as [number, number]; // Capture the last updated warping step
    console.log(
      `    Latest path entry [refIdx, liveIdx] = [${last[0]}, ${last[1]}]`,
    );
    path.push(last); // Store this alignment point in our output path
  }

  console.log(
    `precomputeAlignmentPath: completed, path length = ${path.length}`,
  );
  return path;
};

/**
 * Computes an **offline** dynamic time warping (DTW) alignment path between a reference feature sequence and a live audio recording.
 *
 * @param refFeatures - Precomputed featuregram for the reference score audio
 * @param liveAudioData - Raw mono PCM live audio as Float32Array
 * @param FeaturesCls - Class constructor used to extract features (e.g., CENS, MFCC, etc.)
 * @param sampleRate - Audio sample rate in Hz
 * @param windowLength - Analysis window size in samples (frame size)
 * @returns Array of index pairs [refFrameIndex, liveFrameIndex] from the DTW alignment
 */
export const computeOfflineAlignmentPath = (
  refFeatures: any,
  liveAudioData: Float32Array,
  FeaturesCls: FeaturesConstructor<any>,
  sampleRate: number,
  windowLength: number,
): [number, number][] => {
  // Get live features
  const liveExtractor = new FeaturesCls(
    sampleRate,
    windowLength,
    liveAudioData,
    windowLength,
  );
  const liveFeatures = liveExtractor.featuregram;

  // Define distance function for Offline DTW
  const censDistance = (a: number[], b: number[]) => 1 - dot(a, b);

  // Run Offline DTW given full features
  const dtw = new DynamicTimeWarping(
    refFeatures, // Full ref features
    liveFeatures, // Full live features
    censDistance, // Distance function
  );

  return dtw.getPath(); // Return full path after run
};
