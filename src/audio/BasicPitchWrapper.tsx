import { 
  BasicPitch,
  addPitchBendsToNoteEvents,
  noteFramesToTime,
  outputToNotesPoly, 
} from "@spotify/basic-pitch";

const MODEL_URL =
  "https://unpkg.com/@spotify/basic-pitch@1.0.1/model/model.json";

export async function TranscribeFloat32(
  waveform: Float32Array,
  sampleRate: number
) {
  const basicPitch = new BasicPitch(MODEL_URL);

  const frames: number[][] = [];
  const onsets: number[][] = [];
  const contours: number[][] = [];

  await basicPitch.evaluateModel(
    waveform,
    (f, o, c) => {
      frames.push(...f);
      onsets.push(...o);
      contours.push(...c);
    },
    (progress) => {
      console.log(`Progress: ${(progress * 100).toFixed(1)}%`);
    }
  );

  // Convert output into note events
  const notes = noteFramesToTime(
    addPitchBendsToNoteEvents(
      contours,
      outputToNotesPoly(frames, onsets, 0.25, 0.25, 5) // thresholds & min note length
    )
  );

  return notes;
}