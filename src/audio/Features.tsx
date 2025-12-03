/**
 * Constructor type for creating concrete Feature extractors.
 *
 * @template F - A concrete class extending {@link Features}.
 */
type FeaturesConstructor<F extends Features<unknown>> = new (
  sr: number,
  winLen: number,
  audioSamples?: number[] | Float32Array,
  hopLen?: number
) => F;

/**
 * Abstract base class for feature extraction over sliding audio windows.
 *
 * A `Features` instance holds a list of computed feature vectors ("featuregram"),
 * one per audio frame. Concrete subclasses must implement:
 *   - `makeFeature`: how to compute a feature vector from a frame
 *   - `compareFeatures`: how to compute a distance/similarity score
 *   - `cloneEmpty`: how to allocate an empty instance of the subclass
 *
 * @template T - The representation of a single computed feature vector.
 */
abstract class Features<T> {
  /** Sampling rate (Hz). */
  sr: number;
  /** Window length (in samples). */
  winLen: number;
  /** List of extracted feature vectors. */
  featuregram: T[];
  /** Number of extracted feature vectors. */
  count: number;

  /**
   * Create a feature extractor and optionally compute features immediately.
   *
   * @param sr - Sampling rate, in Hz.
   * @param winLen - Sliding window length in samples.
   * @param audioSamples - Optional audio signal to process.
   * @param hopLen - Optional hop size (defaults to `winLen` for no overlap).
   */
  constructor(
    sr: number,
    winLen: number,
    audioSamples?: number[],
    hopLen?: number
  ) {
    this.sr = sr;
    this.winLen = winLen;
    this.featuregram = [];
    this.count = 0;

    if (!audioSamples) return;
    if (!hopLen) hopLen = winLen;

    let numFeatures = Math.floor((audioSamples.length - winLen) / hopLen) + 1;
    if (numFeatures < 0) numFeatures = 0;

    for (let m = 0; m < numFeatures; m++) {
      const position = m * hopLen;
      const window = audioSamples.slice(position, position + winLen);
      this.insert(window);
    }
  }

  /**
   * Compute a distance or similarity score between two feature vectors.
   *
   * @param vec1 - First feature vector.
   * @param vec2 - Second feature vector.
   */
  abstract compareFeatures(vec1: T, vec2: T): number;

  /**
   * Compute a feature vector from a single audio frame.
   *
   * @param audioFrame - Array of samples with length `winLen`.
   */
  abstract makeFeature(audioFrame: number[]): T;

  /**
   * Create a new empty instance of the concrete subclass.
   */
  abstract cloneEmpty(): this;

  /**
   * Compare two feature vectors from two different featuregrams.
   *
   * @param other - Another `Features` instance of the same subclass.
   * @param idxSelf - Index in `this.featuregram`.
   * @param idxOther - Index in `other.featuregram`.
   */
  compare(other: Features<T>, idxSelf: number, idxOther: number): number {
    const vecSelf = this.featuregram[idxSelf];
    const vecOther = other.featuregram[idxOther];
    return this.compareFeatures(vecSelf, vecOther);
  }

  /**
   * Insert a new audio frame, compute its feature vector,
   * and append it to the featuregram.
   *
   * @param audioFrame - Window of audio samples.
   * @returns The newly computed feature vector.
   */
  insert(audioFrame: number[]): T {
    // console.log("<- Inserting from", audioFrame)
    const feature = this.makeFeature(audioFrame);
    this.featuregram.push(feature);
    this.count++;
    return feature;
  }
}

export { FeaturesConstructor, Features };
