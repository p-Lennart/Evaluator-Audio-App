type FeaturesConstructor<F extends Features<unknown>> = new (
  sr: number,
  winLen: number,
  audioSamples?: number[] | Float32Array,
  hopLen?: number,
) => F;

abstract class Features<T> {
  sr: number;
  winLen: number;
  featuregram: T[];
  count: number;
  netFeatureEncodingTime: number;

  constructor(sr: number, winLen: number) {
    this.sr = sr;
    this.winLen = winLen;
    this.featuregram = [];
    this.count = 0;
    this.netFeatureEncodingTime = 0;
  }

  async populate(audioSamples?: number[], hopLen?: number) {
    if (!audioSamples) return;
    if (!hopLen) hopLen = this.winLen;

    let numFeatures =
      Math.floor((audioSamples.length - this.winLen) / hopLen) + 1;
    if (numFeatures < 0) numFeatures = 0;

    for (let m = 0; m < numFeatures; m++) {
      const position = m * hopLen;
      const window = audioSamples.slice(position, position + this.winLen);
      await this.insert(window);
    }
  }

  abstract compareFeatures(vec1: T, vec2: T): number;

  abstract makeFeature(audioFrame: number[]): Promise<T>;

  abstract cloneEmpty(): this;

  compare(other: Features<T>, idxSelf: number, idxOther: number): number {
    const vecSelf = this.featuregram[idxSelf];
    const vecOther = other.featuregram[idxOther];
    return this.compareFeatures(vecSelf, vecOther);
  }

  async insert(audioFrame: number[]): Promise<T> {
    // console.log("<- Inserting from", audioFrame)
    const startTime = new Date();
    const feature = await this.makeFeature(audioFrame);
    const endTime = new Date();

    this.netFeatureEncodingTime += endTime - startTime;
    console.log(
      `Net live feature encoding time is ${this.netFeatureEncodingTime}ms`,
    );

    this.featuregram.push(feature);
    this.count++;
    return feature;
  }
}

export { FeaturesConstructor, Features };
