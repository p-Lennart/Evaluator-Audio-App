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

import { FeaturesConstructor } from "../audio/features";
import { ScoreFollower } from "../audio/ScoreFollower";
import { dot } from "../audio/FeaturesCENS";
import DynamicTimeWarping from "dynamic-time-warping-ts";

/**
 * Given a DTW warping path and reference audio timestamps, compute estimated live audio timestamps.
 *
 * @param warpingPath - Array of [refFrameIndex, liveFrameIndex] pairs from dynamic time warping
 * @param frameSec - Duration of each frame in seconds (step size)
 * @param refTimes - Array of reference audio timestamps (in seconds)
 * @returns Array of estimated live audio timestamps aligned to the reference
 */
export const calculateWarpedTimes = (
  warpingPath: number[][],
  stepSize: number,
  refTimes: number[],
): number[] => {
  const warpedTimes: number[] = [];

  // Apply step size to both axes of the warping path
  const pathTimes = warpingPath.map(
    ([refIdx, liveIdx]) =>
      [refIdx * stepSize, liveIdx * stepSize] as [number, number],
  );
  const refPathTimes = pathTimes.map((pt) => pt[0]);
  const livePathTimes = pathTimes.map((pt) => pt[1]);

  for (const queryTime of refTimes) {
    // Compute diffs from every refPathTime
    const diffs = refPathTimes.map((t) => t - queryTime);
    // Find index of the minimum absolute diff
    let idx = 0;
    let minAbs = Math.abs(diffs[0]);
    for (let i = 1; i < diffs.length; i++) {
      const absDi = Math.abs(diffs[i]);
      if (absDi < minAbs) {
        minAbs = absDi;
        idx = i;
      }
    }

    // Choose a pair of points to interpolate between
    let leftIdx: number, rightIdx: number;
    if (diffs[idx] >= 0 && idx > 0) {
      leftIdx = idx - 1;
      rightIdx = idx;
    } else if (idx + 1 < livePathTimes.length) {
      leftIdx = idx;
      rightIdx = idx + 1;
    } else {
      leftIdx = rightIdx = idx;
    }

    // If no interpolation needed, just take the point
    if (leftIdx === rightIdx) {
      warpedTimes.push(livePathTimes[leftIdx]);
      continue;
    }

    // Linear interpolation fraction along the ref‐path segment
    const queryRefOffset = queryTime - refPathTimes[leftIdx]; // ≥ 0
    const queryOffsetNorm =
      queryRefOffset === 0 ? 0 : queryRefOffset / stepSize;

    // Project that fraction into the live‐path segment
    const liveMaxOffset = livePathTimes[rightIdx] - livePathTimes[leftIdx];
    const queryOffsetLive = liveMaxOffset * queryOffsetNorm;

    warpedTimes.push(livePathTimes[leftIdx] + queryOffsetLive);
  }

  return warpedTimes;
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
): Array<[number, number]> => {
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
