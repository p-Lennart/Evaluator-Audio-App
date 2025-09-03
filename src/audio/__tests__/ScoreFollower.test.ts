import { ScoreFollower } from "../ScoreFollower";
import { Features } from "../features";

// Mock node-wav decode
jest.mock("node-wav", () => ({
  decode: jest.fn(() => ({
    channelData: [
      new Float32Array([0, 1, 0, -1]),
      new Float32Array([0, 1, 0, -1]),
    ],
    sampleRate: 48000,
  })),
}));

// Mock audio utils used by ScoreFollower
jest.mock("../../utils/audioUtils", () => ({
  toMono: jest.fn((channels: Float32Array[]) => channels[0]),
  resampleAudio: jest.fn(
    (audio: Float32Array) => new Float32Array([...audio, ...audio]),
  ),
}));

class TestFeatures extends Features<number[]> {
  compareFeatures(a: number[], b: number[]): number {
    let sum = 0;
    for (let i = 0; i < Math.min(a.length, b.length); i++) sum += a[i] * b[i];
    return sum;
  }
  makeFeature(frame: number[]): number[] {
    return frame;
  }
  cloneEmpty(): this {
    return new TestFeatures(this.sr, this.winLen) as this;
  }
}

// Helper to mock fetch
function mockFetchOk(bytes: number = 8) {
  // @ts-ignore
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    arrayBuffer: async () => new ArrayBuffer(bytes),
  });
}

function mockFetchFail(status: number = 404, statusText: string = "Not Found") {
  // @ts-ignore
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status,
    statusText,
  });
}

describe("ScoreFollower", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("create() loads ref, builds featuregram, and initializes OTW", async () => {
    mockFetchOk();

    const bigC = 5;
    const maxRunCount = 3;
    const diagWeight = 0.75;
    const sr = 44100;
    const winLen = 4;
    const hopLen = 2;

    const follower = await ScoreFollower.create(
      "http://example.com/ref.wav",
      TestFeatures,
      bigC,
      maxRunCount,
      diagWeight,
      sr,
      winLen,
      hopLen,
    );

    // ref should be a Features instance with some features computed
    expect(follower.ref).toBeInstanceOf(TestFeatures);
    expect(follower.ref.count).toBeGreaterThanOrEqual(1);
    // OTW should be initialized
    expect(follower.otw).toBeDefined();
  });

  it("create() throws when fetch fails", async () => {
    mockFetchFail(500, "Server Error");
    await expect(
      ScoreFollower.create("http://bad.example/ref.wav", TestFeatures),
    ).rejects.toThrow(/Failed to fetch/);
  });

  it("step() pads short frames and returns seconds based on ref index", async () => {
    mockFetchOk();
    const sr = 32000;
    const winLen = 8;
    const follower = await ScoreFollower.create(
      "http://example.com/ref.wav",
      TestFeatures,
      4,
      3,
      1.0,
      sr,
      winLen,
    );

    // Stub otw.insert to control returned ref index
    const insertSpy = jest.spyOn(follower.otw, "insert");
    insertSpy.mockReturnValueOnce(0).mockReturnValueOnce(3);

    // shorter than winLen -> padded
    const t1 = follower.step([1, 2, 3]);
    expect(insertSpy).toHaveBeenNthCalledWith(1, expect.any(Array));
    const arg1 = insertSpy.mock.calls[0][0] as number[];
    expect(arg1.length).toBe(winLen);
    expect(t1).toBe(((0 + 1) * winLen) / sr);

    // exactly winLen -> no extra padding but still length winLen
    const frame = new Array(winLen).fill(0);
    const t2 = follower.step(frame);
    const arg2 = insertSpy.mock.calls[1][0] as number[];
    expect(arg2.length).toBe(winLen);
    expect(t2).toBe(((3 + 1) * winLen) / sr);

    // path should be populated accordingly
    expect(follower.path.length).toBe(2);
    expect(follower.path[0][0]).toBe(0);
    expect(follower.path[1][0]).toBe(3);
  });

  it("getBackwardsPath walks by minimal accumulated costs", async () => {
    mockFetchOk();
    const follower = await ScoreFollower.create(
      "http://example.com/ref.wav",
      TestFeatures,
      4,
      3,
      1.0,
      16000,
      4,
    );

    // Prepare a small cost matrix and indices
    follower.otw.accumulatedCost = [
      [3, 3, 3, 3],
      [3, 2, 2, 2],
      [3, 2, 1, 1],
      [3, 2, 1, 0],
    ];
    follower.otw.refIdx = 3;
    follower.otw.liveIdx = 3;

    const back = follower.getBackwardsPath(2);
    expect(Array.isArray(back)).toBe(true);
    // Should include some steps moving towards smaller indices
    expect(back.length).toBeGreaterThan(0);
    expect(back[0][0]).toBeLessThanOrEqual(3);
  });

  it("getPathDifference returns elements in path but not in backPath", async () => {
    mockFetchOk();
    const follower = await ScoreFollower.create(
      "http://example.com/ref.wav",
      TestFeatures,
      4,
      3,
      1.0,
      16000,
      4,
    );

    follower.path = [
      [0, 0],
      [1, 1],
      [2, 2],
    ];
    const backPath: [number, number][] = [[1, 1]];

    const diff = follower.getPathDifference(backPath);
    expect(diff).toEqual([
      [0, 0],
      [2, 2],
    ]);
  });
});
