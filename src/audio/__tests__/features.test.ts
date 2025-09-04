import { Features } from "../Features";

class TestFeatures extends Features<number[]> {
  compareFeatures(vec1: number[], vec2: number[]): number {
    const a = JSON.stringify(vec1);
    const b = JSON.stringify(vec2);
    return a === b ? 0 : 1;
  }

  makeFeature(audioFrame: number[]): number[] {
    return [...audioFrame];
  }

  cloneEmpty(): this {
    const cloned = new TestFeatures(this.sr, this.winLen) as this;
    return cloned;
  }
}

describe("Features abstract base class behavior via TestFeatures", () => {
  it("initializes without samples", () => {
    const f = new TestFeatures(44100, 4);
    expect(f.sr).toBe(44100);
    expect(f.winLen).toBe(4);
    expect(f.featuregram).toEqual([]);
    expect(f.count).toBe(0);
  });

  it("processes windows with default hop equal to winLen", () => {
    const samples = [1, 2, 3, 4, 5, 6, 7, 8];
    const winLen = 4;
    // hopLen defaults to winLen (4), windows should be:
    // [1,2,3,4] and [5,6,7,8]
    const f = new TestFeatures(16000, winLen, samples);
    expect(f.count).toBe(2);
    expect(f.featuregram).toEqual([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
    ]);
  });

  it("processes windows with provided hopLen", () => {
    const samples = [0, 1, 2, 3, 4, 5, 6];
    const winLen = 3;
    const hopLen = 2;
    // windows: [0,1,2], [2,3,4], [4,5,6]
    const f = new TestFeatures(22050, winLen, samples, hopLen);
    expect(f.count).toBe(3);
    expect(f.featuregram).toEqual([
      [0, 1, 2],
      [2, 3, 4],
      [4, 5, 6],
    ]);
  });

  it("handles audio shorter than window (no features)", () => {
    const samples = [1, 2];
    const f = new TestFeatures(8000, 4, samples);
    expect(f.count).toBe(0);
    expect(f.featuregram).toEqual([]);
  });

  it("insert adds a feature and returns it", () => {
    const f = new TestFeatures(44100, 2);
    const returned = f.insert([9, 10]);
    expect(returned).toEqual([9, 10]);
    expect(f.count).toBe(1);
    expect(f.featuregram[0]).toEqual([9, 10]);
  });

  it("compare uses compareFeatures on stored vectors", () => {
    const f1 = new TestFeatures(44100, 2);
    const f2 = new TestFeatures(44100, 2);
    f1.insert([1, 2]);
    f2.insert([1, 2]);
    f2.insert([3, 4]);

    // same vectors -> distance 0
    expect(f1.compare(f2, 0, 0)).toBe(0);
    // different vectors -> distance 1
    expect(f1.compare(f2, 0, 1)).toBe(1);
  });

  it("cloneEmpty creates a new empty instance with same params", () => {
    const original = new TestFeatures(32000, 5, [1, 2, 3, 4, 5]);
    const cloned = original.cloneEmpty();
    expect(cloned).not.toBe(original);
    expect(cloned.sr).toBe(original.sr);
    expect(cloned.winLen).toBe(original.winLen);
    expect(cloned.count).toBe(0);
    expect(cloned.featuregram).toEqual([]);
  });
});
