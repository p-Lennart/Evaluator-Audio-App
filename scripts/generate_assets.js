const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const SRC_DIR = path.join(__dirname, '..', 'src');
const SCORE_MAPS_DIR = path.join(SRC_DIR, 'score_name_to_data_map');
const CONFIG_FILE = path.join(__dirname, 'asset-config.json');

// Load configuration
let assetConfig;
try {
  assetConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
} catch (e) {
  console.warn('Could not load asset-config.json, using defaults');
  assetConfig = { pieces: {}, defaultBpm: 100 };
}

let scoreToMusicxmlMap;
let scoreToMidi;

try {
  scoreToMusicxmlMap = require(path.join(SCORE_MAPS_DIR, 'scoreToMusicxmlMap.ts'));
} catch (e) {
  console.warn('Could not load scoreToMusicxmlMap.ts');
  scoreToMusicxmlMap = { scoresData: {} };
}

try {
  scoreToMidi = require(path.join(SCORE_MAPS_DIR, 'scoreToMidi.ts'));
} catch (e) {
  console.warn('Could not load scoreToMidi.ts');
  scoreToMidi = {};
}

function getBPMsForPiece(pieceName) {
  const piecePath = path.join(PUBLIC_DIR, pieceName);
  const bpms = new Set();

  // Check for existing BPM folders
  if (fs.existsSync(piecePath)) {
    const items = fs.readdirSync(piecePath).filter(item => {
      const fullPath = path.join(piecePath, item);
      return fs.statSync(fullPath).isDirectory() && item.match(/^\d+bpm$/);
    });

    items.forEach(item => {
      const bpmMatch = item.match(/^(\d+)bpm$/);
      if (bpmMatch) {
        bpms.add(parseInt(bpmMatch[1]));
      }
    });
  }

  if (bpms.size === 0) {
    const baselinePath = path.join(piecePath, 'baseline');
    if (fs.existsSync(baselinePath)) {
      // Use BPMs from config file
      if (assetConfig.pieces[pieceName] && assetConfig.pieces[pieceName].bpms) {
        assetConfig.pieces[pieceName].bpms.forEach(bpm => bpms.add(bpm));
      } else {
        // Fallback to default BPM from config
        bpms.add(assetConfig.defaultBpm || 100);
        console.warn(`No BPM configuration found for ${pieceName}, using default: ${assetConfig.defaultBpm || 100}`);
      }
    }
  }

  return Array.from(bpms).sort((a, b) => a - b);
}

function generateMusicXML(pieceName, bpm) {
  const musicxmlKey = `${pieceName}.musicxml`;
  if (!scoreToMusicxmlMap.scoresData || !scoreToMusicxmlMap.scoresData[musicxmlKey]) {
    console.warn(`No MusicXML template found for ${pieceName}`);
    return null;
  }

  let musicxmlContent = scoreToMusicxmlMap.scoresData[musicxmlKey];

  return musicxmlContent;
}

function copyAsset(sourcePath, destPath) {
  if (fs.existsSync(sourcePath)) {
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(sourcePath, destPath);
    return true;
  }
  return false;
}

/**
 * Extract embedded MusicXML strings from scoreToMusicxmlMap.ts
 * and return them as a map
 */
function extractEmbeddedMusicXML() {
  console.log('\nExtracting embedded MusicXML...');

  const scoreMapPath = path.join(SCORE_MAPS_DIR, 'scoreToMusicxmlMap.ts');

  if (!fs.existsSync(scoreMapPath)) {
    console.warn('scoreToMusicxmlMap.ts not found, skipping extraction');
    return {};
  }

  const fileContent = fs.readFileSync(scoreMapPath, 'utf8');

  // Pattern matches: "score_name.musicxml": `<?xml version...` ... `</score-partwise>`
  const scorePattern = /"([^"]+\.musicxml)":\s*`([\s\S]*?)`(?=,\s*(?:"[^"]+\.musicxml":|}\s*;))/g;

  const extracted = {};
  let match;
  let count = 0;

  while ((match = scorePattern.exec(fileContent)) !== null) {
    const [, scoreName, xmlContent] = match;
    const pieceName = scoreName.replace('.musicxml', '');

    // Clean up escaped characters in the template literal
    const cleanedXML = xmlContent
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, '\\')
      .trim();

    console.log(`Extracted: ${pieceName} (${cleanedXML.length} bytes)`);
    extracted[pieceName] = cleanedXML;
    count++;
  }

  console.log(`Total extracted: ${count} scores\n`);
  return extracted;
}

/**
 * Write extracted MusicXML to appropriate piece directories
 * This scans for BPM directories independently 
 */
function writeMusicXMLFiles(extractedXML) {
  console.log('Writing MusicXML files to public directories...');

  let written = 0;

  Object.entries(extractedXML).forEach(([pieceName, xmlContent]) => {
    const piecePath = path.join(PUBLIC_DIR, pieceName);

    if (!fs.existsSync(piecePath)) {
      console.warn(`Piece directory not found for ${pieceName}, skipping`);
      return;
    }

    const bpms = getBPMsForPiece(pieceName);

    if (bpms.length === 0) {
      console.warn(`No BPM directories found for ${pieceName}, skipping`);
      return;
    }

    // Write to all BPM directories for this piece
    bpms.forEach(bpm => {
      const bpmDir = `${bpm}bpm`;
      const bpmPath = path.join(piecePath, bpmDir);

      if (!fs.existsSync(bpmPath)) {
        fs.mkdirSync(bpmPath, { recursive: true });
        console.log(`Created directory: ${bpmPath}`);
      }

      const xmlPath = path.join(bpmPath, 'score.musicxml');

      try {
        fs.writeFileSync(xmlPath, xmlContent, 'utf8');
        console.log(`${pieceName}/${bpmDir}/score.musicxml`);
        written++;
      } catch (error) {
        console.error(`Failed to write ${xmlPath}:`, error.message);
      }
    });
  });

  console.log(`Total written: ${written} files\n`);
}

function generateAssetsForPiece(pieceName, bpm) {
  const bpmDir = `${bpm}bpm`;
  const bpmPath = path.join(PUBLIC_DIR, pieceName, bpmDir);

  // Generate MusicXML
  const musicxmlContent = generateMusicXML(pieceName, bpm);
  if (musicxmlContent) {
    const musicxmlPath = path.join(bpmPath, 'score.musicxml');
    fs.writeFileSync(musicxmlPath, musicxmlContent);
    console.log(`Generated: score.musicxml`);
  }

  // Copy MIDI file
  const midiSource = path.join(ASSETS_DIR, 'midi', `${pieceName}.mid`);
  const midiDest = path.join(bpmPath, 'notes.midi');
  if (copyAsset(midiSource, midiDest)) {
    console.log(`Copied: notes.midi`);
  }

  let csvSource = null;
  const possibleCsvPaths = [
    path.join(PUBLIC_DIR, pieceName, 'baseline', `${pieceName}_${bpm}bpm.csv`),
    path.join(PUBLIC_DIR, pieceName, 'baseline', `${pieceName}.csv`),
    path.join(PUBLIC_DIR, pieceName, 'baseline', `aotgs_solo_${bpm}bpm.csv`), 
    path.join(PUBLIC_DIR, pieceName, 'baseline', `schumann_melody_${bpm}sec.csv`),
    path.join(PUBLIC_DIR, pieceName, 'baseline', `ode_to_joy_${bpm}bpm.csv`)
  ];

  for (const csvPath of possibleCsvPaths) {
    if (fs.existsSync(csvPath)) {
      csvSource = csvPath;
      break;
    }
  }

  if (!csvSource) {
    const baselinePath = path.join(PUBLIC_DIR, pieceName, 'baseline');
    if (fs.existsSync(baselinePath)) {
      const csvFiles = fs.readdirSync(baselinePath).filter(file => file.endsWith('.csv'));
      if (csvFiles.length > 0) {
        csvSource = path.join(baselinePath, csvFiles[0]);
      }
    }
  }

  const csvDest = path.join(bpmPath, 'ref_notes.csv');
  if (csvSource && copyAsset(csvSource, csvDest)) {
    console.log(`  Copied: ref_notes.csv`);
  }

  let wavSource = null;
  const possibleWavPaths = [
    path.join(PUBLIC_DIR, pieceName, `${bpm}bpm`, 'instrument_0.wav'),
    path.join(PUBLIC_DIR, pieceName, 'baseline', 'instrument_0.wav'),
    path.join(PUBLIC_DIR, pieceName, 'baseline', `${pieceName}_ref.wav`),
    path.join(PUBLIC_DIR, pieceName, 'baseline', `aotgs_solo_ref.wav`)
  ];

  for (const wavPath of possibleWavPaths) {
    if (fs.existsSync(wavPath)) {
      wavSource = wavPath;
      break;
    }
  }

  const wavDest = path.join(bpmPath, 'ref_audio.wav');
  if (wavSource && copyAsset(wavSource, wavDest)) {
    console.log(`  Copied: ref_audio.wav`);
  }
}


/**
 * Scans the public directory for score assets and generates missing ones
 */
function scanAndGenerateAssets() {
  console.log('Scanning and generating assets in:', PUBLIC_DIR);

  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error('Public directory not found:', PUBLIC_DIR);
    process.exit(1);
  }

  const scores = {};
  const errors = [];

  const pieceNames = fs.readdirSync(PUBLIC_DIR)
    .filter(name => {
      const fullPath = path.join(PUBLIC_DIR, name);
      return fs.statSync(fullPath).isDirectory() && !name.startsWith('.');
    });

  console.log(`Found ${pieceNames.length} piece directories`);

  pieceNames.forEach(pieceName => {
    const piecePath = path.join(PUBLIC_DIR, pieceName);

    const bpms = getBPMsForPiece(pieceName);

    bpms.forEach(bpm => {
      const bpmDir = `${bpm}bpm`;
      const bpmPath = path.join(piecePath, bpmDir);
      const scoreKey = `${pieceName}/${bpmDir}`;

      // Ensure BPM directory exists
      if (!fs.existsSync(bpmPath)) {
        fs.mkdirSync(bpmPath, { recursive: true });
        console.log(`Created directory: ${bpmPath}`);
      }

      // Generate/copy required files
      generateAssetsForPiece(pieceName, bpm);

      const missing = [];
      const requiredFiles = ['score.musicxml', 'notes.midi', 'ref_notes.csv', 'ref_audio.wav'];

      requiredFiles.forEach(filename => {
        const filePath = path.join(bpmPath, filename);
        if (!fs.existsSync(filePath)) {
          missing.push(filename);
        }
      });

      if (missing.length > 0) {
        errors.push({
          score: scoreKey,
          missing: missing
        });
        console.warn(`${scoreKey}: Missing files: ${missing.join(', ')}`);
      } else {
        scores[scoreKey] = {
          pieceName,
          bpm: bpm,
          musicxml: `/${pieceName}/${bpmDir}/score.musicxml`,
          midi: `/${pieceName}/${bpmDir}/notes.midi`,
          csv: `/${pieceName}/${bpmDir}/ref_notes.csv`,
          audio: `/${pieceName}/${bpmDir}/ref_audio.wav`
        };
        console.log(`${scoreKey}`);
      }
    });
  });

  return { scores, errors };
}

/**
 * Generates TypeScript mapping file
 */
function generateTypeScriptMap(scores) {
  console.log('\nGenerating TypeScript map...');

  const scoreEntries = Object.entries(scores)
    .map(([key, data]) => {
      return `  "${key}": {
    pieceName: "${data.pieceName}",
    bpm: ${data.bpm},
    musicxml: "${data.musicxml}",
    midi: "${data.midi}",
    csv: "${data.csv}",
    audio: "${data.audio}"
  }`;
    })
    .join(',\n');

  const tsContent = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated: ${new Date().toISOString()}
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
${scoreEntries}
};

/**
 * Get reference audio path for a score
 */
export function getScoreRefAudio(scoreName: string): string {
  const score = unifiedScoreMap[scoreName];
  if (!score) {
    throw new Error(\`Score not found: \${scoreName}\`);
  }
  return score.audio;
}

/**
 * Get CSV data path for a score
 */
export function getScoreCSVData(scoreName: string): string {
  const score = unifiedScoreMap[scoreName];
  if (!score) {
    throw new Error(\`Score not found: \${scoreName}\`);
  }
  return score.csv;
}

/**
 * Get MusicXML path for a score
 */
export function getScoreMusicXML(scoreName: string): string {
  const score = unifiedScoreMap[scoreName];
  if (!score) {
    throw new Error(\`Score not found: \${scoreName}\`);
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
    throw new Error(\`Score not found: \${scoreName}\`);
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
`;

  const OUTPUT_TS_FILE = path.join(SCORE_MAPS_DIR, 'generatedAssetMappings.ts');

  // Ensure output directory exists
  if (!fs.existsSync(SCORE_MAPS_DIR)) {
    fs.mkdirSync(SCORE_MAPS_DIR, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_TS_FILE, tsContent);
  console.log('TypeScript map written to:', OUTPUT_TS_FILE);
}

/**
 * Generates JSON metadata file
 */
function generateJSONMetadata(scores, errors) {
  console.log('\nGenerating JSON metadata...');

  const metadata = {
    generatedAt: new Date().toISOString(),
    scoreCount: Object.keys(scores).length,
    errors: errors,
    scores: scores
  };

  const OUTPUT_JSON_FILE = path.join(PUBLIC_DIR, 'assetMappings.json');
  fs.writeFileSync(OUTPUT_JSON_FILE, JSON.stringify(metadata, null, 2));
  console.log('JSON metadata written to:', OUTPUT_JSON_FILE);
}

/**
 * Validates MusicXML files
 */
function validateMusicXML(scores) {
  console.log('\nValidating MusicXML files...');

  const validationResults = [];

  Object.entries(scores).forEach(([key, data]) => {
    try {
      const xmlPath = path.join(PUBLIC_DIR, data.musicxml);
      const xmlContent = fs.readFileSync(xmlPath, 'utf8');
      
      const hasScorePartwise = xmlContent.includes('<score-partwise');
      const hasTempo = xmlContent.includes('tempo') || xmlContent.includes('per-minute');
      
      if (!hasScorePartwise) {
        validationResults.push({
          score: key,
          warning: 'Missing <score-partwise> element'
        });
      }
      
      if (!hasTempo) {
        validationResults.push({
          score: key,
          warning: 'No tempo information found'
        });
      }
    } catch (error) {
      validationResults.push({
        score: key,
        error: error.message
      });
    }
  });

  if (validationResults.length > 0) {
    console.log('Validation warnings:');
    validationResults.forEach(result => {
      console.log(`${result.score}: ${result.warning || result.error}`);
    });
  } else {
    console.log('All MusicXML files valid');
  }

  return validationResults;
}

/**
 * Main execution
 */
function main() {
  console.log('===Asset Generation and Mapping Script===');

  // Extract embedded MusicXML from TypeScript file
  console.log('========');
  const extractedXML = extractEmbeddedMusicXML();

  // Write extracted MusicXML to public directories before scanning
  console.log('========');
  if (Object.keys(extractedXML).length > 0) {
    writeMusicXMLFiles(extractedXML);
  } else {
    console.log('No MusicXML to write (extraction failed or skipped)\n');
  }

  console.log('========');
  console.log('Scanning public directory...\n');
  const { scores, errors } = scanAndGenerateAssets();

  if (Object.keys(scores).length === 0) {
    console.error('\nNo valid scores found!');
    process.exit(1);
  }

  // Generate TypeScript mappings
  console.log('========');
  console.log('Generating TypeScript mappings...\n');
  generateTypeScriptMap(scores);

  // Generate JSON metadata
  console.log('========');
  console.log('Generating JSON metadata...\n');
  generateJSONMetadata(scores, errors);

  // Validate
  console.log('========');
  console.log('Validating MusicXML files...\n');
  const validationResults = validateMusicXML(scores);

  // Summary
  console.log('===Build Summary===');
  console.log(`${Object.keys(scores).length} scores processed`);
  console.log(`${Object.keys(extractedXML).length} MusicXML files extracted`);

  if (errors.length > 0) {
    console.log(`${errors.length} scores with missing files:`);
    errors.forEach(err => {
      console.log(`${err.score}: ${err.missing.join(', ')}`);
    });
  }

  if (validationResults.length > 0) {
    console.log(`${validationResults.length} validation warnings`);
  }

  console.log('\nGenerated files:');
  console.log(`${path.relative(process.cwd(), path.join(SCORE_MAPS_DIR, 'generatedAssetMappings.ts'))}`);
  console.log(`${path.relative(process.cwd(), path.join(PUBLIC_DIR, 'assetMappings.json'))}`);
  console.log('\nRun with: npm run generate-assets\n');
}

if (require.main === module) {
  main();
}

module.exports = { scanAndGenerateAssets, generateTypeScriptMap, generateJSONMetadata };