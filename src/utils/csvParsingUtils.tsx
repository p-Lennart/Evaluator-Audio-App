/**
 * Represents a single row of tempo CSV data.
 */
export interface CSVRow {
  beat: number; // 1-based beat index
  refTime: number; // Reference time (s) for this beat in the baseline performance
  liveTime: number; // Actual live performance time (s) recorded for this beat
  predictedTime: number; // Placeholder for predicted live time (to be filled later)
}

/**
 * Parses raw CSV text from a tempo file into an array of CSVRow objects.
 * Assumes the first line is a header and each subsequent line has at least 7 comma-separated columns:
 *   [0]=beatIndex, ..., [5]=refTime, [6]=liveTime
 *
 * @param text - Full CSV content as a string
 * @returns Array of CSVRow with predictedTime initialized to 0
 */
export const parseCsv = (text: string): CSVRow[] => {
  const lines = text.trim().split(/\r?\n/); // Split into lines and remove any trailing blank lines
  const dataLines = lines.slice(1); // Drop the header row

  return dataLines.map((line) => {
    const cols = line.split(",");
    const beat = parseFloat(cols[0]) + 1; // convert 0-based to 1-based beat index
    const refTime = parseFloat(cols[5]); // reference timestamp in seconds
    const liveTime = parseFloat(cols[6]); // live performance timestamp in seconds
    const predictedTime = 0; // will be filled in after alignment

    return { beat, refTime, liveTime, predictedTime };
  });
};

/**
 * Loads and parses a tempo CSV from a given URI.
 *
 * @param csvUri - URI or path to the CSV file
 * @returns Promise resolving to an array of CSVRow
 */
export const loadCsvInfo = async (csvUri: string): Promise<CSVRow[]> => {
  let text: string;
  text = await fetch(csvUri).then((r) => r.text()); // Fetch the CSV file content as plain text
  return parseCsv(text); // Parse the CSV text into structured data
};
