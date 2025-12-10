/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated: 2025-12-10T08:25:09.469Z
 *
 * This file maps score names to their asset paths.
 * Regenerate using: npm run generate-assets
 */

export interface ScoreAssets {
  pieceName: string;
  bpm: number;
  musicxml: string;
  midi: string;
  csv: string;
  audio: string;
}

export const unifiedScoreMap: Record<string, ScoreAssets> = {
  "air_on_the_g_string/100bpm": {
    pieceName: "air_on_the_g_string",
    bpm: 100,
    musicxml: "/air_on_the_g_string/100bpm/score.musicxml",
    midi: "/air_on_the_g_string/100bpm/notes.midi",
    csv: "/air_on_the_g_string/100bpm/ref_notes.csv",
    audio: "/air_on_the_g_string/100bpm/ref_audio.wav"
  },
  "schumann_melodyVLCduet/100bpm": {
    pieceName: "schumann_melodyVLCduet",
    bpm: 100,
    musicxml: "/schumann_melodyVLCduet/100bpm/score.musicxml",
    midi: "/schumann_melodyVLCduet/100bpm/notes.midi",
    csv: "/schumann_melodyVLCduet/100bpm/ref_notes.csv",
    audio: "/schumann_melodyVLCduet/100bpm/ref_audio.wav"
  }
};

/**
 * Get reference audio path for a score
 */
export function getScoreRefAudio(scoreName: string): string {
  const score = unifiedScoreMap[scoreName];
  if (!score) {
    throw new Error(`Score not found: ${scoreName}`);
  }
  return score.audio;
}

/**
 * Get CSV data path for a score
 */
export function getScoreCSVData(scoreName: string): string {
  const score = unifiedScoreMap[scoreName];
  if (!score) {
    throw new Error(`Score not found: ${scoreName}`);
  }
  return score.csv;
}

/**
 * Get MusicXML path for a score
 */
export function getScoreMusicXML(scoreName: string): string {
  const score = unifiedScoreMap[scoreName];
  if (!score) {
    throw new Error(`Score not found: ${scoreName}`);
  }
  return score.musicxml;
}

/**
 * Get all available score names
 */
export function getAllScoreNames(): string[] {
  return Object.keys(unifiedScoreMap);
}

/**
 * Get MIDI path for a score
 */
export function getScoreMIDI(scoreName: string): string {
  const score = unifiedScoreMap[scoreName];
  if (!score) {
    throw new Error(`Score not found: ${scoreName}`);
  }
  return score.midi;
}

/**
 * Get scores by piece name
 */
export function getScoresByPiece(pieceName: string): string[] {
  return Object.keys(unifiedScoreMap).filter(key =>
    unifiedScoreMap[key].pieceName === pieceName
  );
}

/**
 * Get all unique piece names
 */
export function getAllPieceNames(): string[] {
  const pieces = new Set<string>();
  Object.values(unifiedScoreMap).forEach(score => pieces.add(score.pieceName));
  return Array.from(pieces).sort();
}

/**
 * Get BPM variants available for a piece
 */
export function getBPMsForPiece(pieceName: string): number[] {
  return Object.values(unifiedScoreMap)
    .filter(score => score.pieceName === pieceName)
    .map(score => score.bpm)
    .sort((a, b) => a - b);
}

export default unifiedScoreMap;
