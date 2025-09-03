import { CENSFeatures, dot } from "../../audio/FeaturesCENS";

function generateSineWave(
  frequencyHz: number,
  sampleRate: number,
  length: number,
): number[] {
  const out = new Array(length);
  for (let i = 0; i < length; i++) {
    out[i] = Math.sin((2 * Math.PI * frequencyHz * i) / sampleRate);
  }
  return out;
}

describe("CENSFeatures", () => {
  it("makeFeature returns 12-D non-negative L2-normalized vector", () => {
    const sr = 22050;
    const winLen = 128;
    const f = new CENSFeatures(sr, winLen);
    const frame = generateSineWave(440, sr, winLen);
    const vec = f.makeFeature(frame);

    expect(vec.length).toBe(12);
    for (const v of vec) {
      expect(Number.isFinite(v)).toBe(true);
      expect(v).toBeGreaterThanOrEqual(0);
    }
    const l2 = Math.sqrt(vec.reduce((s, v) => s + v * v, 0));
    expect(l2).toBeGreaterThan(0.99);
    expect(l2).toBeLessThanOrEqual(1.01);
  });

  it("throws if frame length does not match winLen", () => {
    const sr = 16000;
    const winLen = 64;
    const f = new CENSFeatures(sr, winLen);
    const bad = new Array(winLen - 1).fill(0);
    expect(() => f.makeFeature(bad)).toThrow();
  });

  it("compareFeatures behaves like dot product on CENS vectors", () => {
    const sr = 44100;
    const winLen = 256;
    const f = new CENSFeatures(sr, winLen);
    const frame = generateSineWave(523.25, sr, winLen); // ~C5
    const v1 = f.makeFeature(frame);
    const v2 = f.makeFeature(frame);

    const d1 = f.compareFeatures(v1, v2);
    const d2 = dot(v1, v2);
    expect(Math.abs(d1 - d2)).toBeLessThan(1e-9);
    // identical normalized vectors should have dot ~= 1
    expect(d1).toBeGreaterThan(0.99);
    expect(d1).toBeLessThanOrEqual(1.01);
  });

  it("constructor streams samples into featuregram with default hopLen", () => {
    const sr = 8000;
    const winLen = 32;
    // Build two frames back-to-back: first sine, then silence
    const frame1 = generateSineWave(440, sr, winLen);
    const frame2 = new Array(winLen).fill(0);
    const samples = [...frame1, ...frame2];

    const f = new CENSFeatures(sr, winLen, samples); // hopLen defaults to winLen
    expect(f.count).toBe(2);
    expect(f.featuregram.length).toBe(2);

    const v1 = f.featuregram[0];
    const v2 = f.featuregram[1];
    // vectors should be valid and normalized
    const l2_1 = Math.sqrt(v1.reduce((s, v) => s + v * v, 0));
    const l2_2 = Math.sqrt(v2.reduce((s, v) => s + v * v, 0));
    expect(l2_1).toBeGreaterThan(0.99);
    expect(l2_1).toBeLessThanOrEqual(1.01);
    expect(l2_2).toBeGreaterThan(0.99);
    expect(l2_2).toBeLessThanOrEqual(1.01);

    // content likely differs between sine and silence
    // (silence after processing/quantization may still be normalized but pattern differs)
    const similarity = v1.reduce((s, v, i) => s + v * v2[i], 0);
    expect(similarity).toBeLessThan(0.999); // not identical
  });
});
