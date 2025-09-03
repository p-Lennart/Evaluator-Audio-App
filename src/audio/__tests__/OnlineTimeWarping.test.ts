import OnlineTimeWarping from "../../audio/OnlineTimeWarping";
import { Features } from "../../audio/features";

class MinimalFeatures extends Features<number[]> {
  compareFeatures(vec1: number[], vec2: number[]): number {
    // assume L2-normalized inputs; return dot product in [0,1]
    let sum = 0;
    for (let i = 0; i < Math.min(vec1.length, vec2.length); i++) {
      sum += vec1[i] * vec2[i];
    }
    return sum;
  }

  makeFeature(audioFrame: number[]): number[] {
    // L2-normalize for stable comparisons
    const l2 = Math.sqrt(audioFrame.reduce((s, v) => s + v * v, 0)) || 1;
    return audioFrame.map((v) => v / l2);
  }

  cloneEmpty(): this {
    return new MinimalFeatures(this.sr, this.winLen) as this;
  }
}

function unit(index: number, size: number): number[] {
  const v = new Array(size).fill(0);
  v[index % size] = 1;
  return v;
}

function isNonDecreasing(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}

describe("OnlineTimeWarping", () => {
  it("initializes with an empty live sequence and proper ref length", () => {
    const ref = new MinimalFeatures(1, 3);
    // build a short reference of 5 frames
    for (let i = 0; i < 5; i++) ref.insert(unit(i, 3));

    const bigC = 5;
    const maxRunCount = 10;
    const diagWeight = 1.0;
    const otw = new OnlineTimeWarping(ref, bigC, maxRunCount, diagWeight);

    expect(otw.refLen).toBe(5);
    expect(otw.live.count).toBe(0);
  });

  it("tracks progression on perfectly matching live frames", () => {
    const refLen = 8;
    const ref = new MinimalFeatures(1, 3);
    for (let i = 0; i < refLen; i++) ref.insert(unit(i, 3));

    const bigC = refLen; // wide window
    const otw = new OnlineTimeWarping(ref, bigC, 100, 1.0);

    const positions: number[] = [];
    for (let i = 0; i < refLen; i++) {
      const pos = otw.insert(unit(i, 3));
      positions.push(pos);
      expect(pos).toBeGreaterThanOrEqual(0);
      expect(pos).toBeLessThan(refLen);
    }

    expect(isNonDecreasing(positions)).toBe(true);
    expect(positions[positions.length - 1]).toBe(refLen - 1);
  });

  it("handles mismatched frames without regressing position", () => {
    const refLen = 6;
    const ref = new MinimalFeatures(1, 3);
    for (let i = 0; i < refLen; i++) ref.insert(unit(i, 3));

    const otw = new OnlineTimeWarping(ref, /*bigC*/ 3, /*maxRunCount*/ 3, 1.0);

    const positions: number[] = [];
    // first, a mismatch
    positions.push(otw.insert(unit(2, 3)));
    // then, several correct frames
    for (let i = 0; i < refLen; i++) positions.push(otw.insert(unit(i, 3)));

    expect(isNonDecreasing(positions)).toBe(true);
    expect(positions[positions.length - 1]).toBe(refLen - 1);
  });
});
