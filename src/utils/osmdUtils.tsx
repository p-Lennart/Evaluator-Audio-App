import { extractTempo } from "./fileSelectorUtils";
import { OpenSheetMusicDisplay, Cursor, Fraction, GraphicalNote } from "opensheetmusicdisplay";
import { Platform } from "react-native";
import scoresData from "../score_name_to_data_map/scoreToMusicxmlMap";

/**
 * Initialize and render OpenSheetMusicDisplay in a **web** environment.
 *
 * @param osmContainerRef - Ref to the HTML div container where OSMD should render.
 * @param osdRef - Mutable ref to store the OSMD instance for later access.
 * @param cursorRef - Mutable ref to store the OSMD cursor instance.
 * @param state - Global or component state containing the selected score name/content.
 * @param dispatch - Function to dispatch actions to update global state.
 * @param isSmallScreen - Flag to adjust zoom for small screen devices.
 * @returns void
 */

export const initOsmdWeb = (
  osmContainerRef: React.RefObject<HTMLDivElement>,
  osdRef: React.MutableRefObject<OpenSheetMusicDisplay | null>,
  cursorRef: React.MutableRefObject<Cursor | null>,
  state: any,
  dispatch: Function,
  isSmallScreen: boolean,
) => {
  if (Platform.OS === "web" && osmContainerRef.current && state.score) {
    // Remove any previously-loaded music
    if (osmContainerRef.current) {
      while (osmContainerRef.current.children[0]) {
        osmContainerRef.current.removeChild(
          osmContainerRef.current.children[0],
        );
      }
    }

    // Create an instance of OpenSheetMusicDisplay, passing the reference to the container
    const osm = new OpenSheetMusicDisplay(
      osmContainerRef.current as HTMLElement,
      {
        autoResize: true, // Enable automatic resizing of the sheet music display
        followCursor: true, // And follow the cursor
      },
    );
    osdRef.current = osm;
    // If score name is a key within ScoreContents use the xml content value within that key, otherwise access xml content through the static key value mapping defined within scores.ts
    const xmlContent =
      (state.scoreContents && state.scoreContents[state.score]) ||
      scoresData[state.score];

    // Error handling if no xml content for selected score is found
    if (!xmlContent) {
      console.error("Score content not found for:", state.score);
      return;
    }
    const tempo = extractTempo(xmlContent); // Extract tempo from selected score (via musicxml)
    // Load and render the XML content.
    osm
      .load(xmlContent)
      .then(() => {
        // Render the sheet music
        osm.render();
        cursorRef.current = osm.cursor;
        cursorRef.current.show(); // Ensure the cursor is visible
        cursorRef.current.CursorOptions = {
          ...cursorRef.current.CursorOptions,
          follow: true,
        };
        osdRef.current!.zoom = 0.65;
        if (isSmallScreen) {
          osdRef.current!.zoom = 0.45;
        }

        dispatch({
          type: "update_piece_info",
          tempo: tempo,
          beatsPerMeasure:
            cursorRef.current.Iterator.CurrentMeasure.ActiveTimeSignature
              .Numerator,
        });
      })
      .catch((error) => {
        // Handle errors in loading the music XML file
        console.error("Error loading music XML:", error);
      });
  }
};

/**
 * Peek at the beat length of the **next note** under the cursor without moving it permanently.
 *
 * @param cursor - OSMD Cursor instance.
 * @param instruments - Array of OSMD Instrument objects.
 * @param timeDenominator - Denominator from the active time signature.
 * @returns Number of beats for the next note (scaled to timeDenominator).
 */
export const peekAtNextBeat = (
  cursor: Cursor,
  instruments: any[],
  timeDenominator: number,
): number => {
  let delta = 0;
  cursor.next();
  const current = cursor.VoicesUnderCursor(instruments[0]);
  if (current.length && current[0].Notes.length) {
    const len = current[0].Notes[0].Length as Fraction;
    const num = len.Numerator === 0 ? 1 : len.Numerator;
    delta = (num / len.Denominator) * timeDenominator;
  } else {
    console.log("No note under cursor.");
  }
  cursor.previous();
  return delta;
};

/**
 * Advance the cursor to the **next note** and return its beat length.
 *
 * @param cursor - OSMD Cursor instance.
 * @param instruments - Array of OSMD Instrument objects.
 * @param timeDenominator - Denominator from the active time signature.
 * @returns Number of beats moved forward (scaled to timeDenominator).
 */

export const advanceToNextBeat = (
  cursor: Cursor,
  instruments: any[],
  timeDenominator: number,
): number => {
  cursor.next();
  const current = cursor.VoicesUnderCursor(instruments[0]);
  let delta = 0;
  if (current.length && current[0].Notes.length) {
    const len = current[0].Notes[0].Length as Fraction;
    const num = len.Numerator === 0 ? 1 : len.Numerator;
    delta = (num / len.Denominator) * timeDenominator;
  } else {
    console.log("No note under cursor.");
  }
  return delta;
};

/**
 * Peek at the beat length of the **current note** under the cursor.
 *
 * @param cursor - OSMD Cursor instance.
 * @param instruments - Array of OSMD Instrument objects.
 * @param timeDenominator - Denominator from the active time signature.
 * @returns Number of beats for the current note (scaled to timeDenominator).
 */
export const peekAtCurrentBeat = (
  cursor: Cursor,
  instruments: any[],
  timeDenominator: number,
): number => {
  let delta = 0;
  const current = cursor.VoicesUnderCursor(instruments[0]);
  if (current.length && current[0].Notes.length) {
    const len = current[0].Notes[0].Length as Fraction;
    const num = len.Numerator === 0 ? 1 : len.Numerator;
    delta = (num / len.Denominator) * timeDenominator;
  } else {
    console.log("No note under cursor.");
  }
  return delta;
};

// Match music21 flatten().notes generated csvs: no rests, all notes (normal, tied, grace) 
export function getAllGraphicalNotes(osmd: any): any[] {
  const notes: any[] = [];
  const sheet = osmd.GraphicSheet;
  if (!sheet?.MeasureList) return notes;

  for (const gMeasure of (sheet.MeasureList as any).flat()) {
    for (const staffEntry of gMeasure.staffEntries ?? []) {
      for (const gve of staffEntry.graphicalVoiceEntries ?? []) {
        for (const gNote of gve.notes ?? []) {
          const src = gNote.sourceNote;
          if (!src) continue;

          // filter out rests  as per music21.notes
          if (src.isRest && src.isRest()) continue;

          notes.push(gNote);
        }
      }
    }
  }
  return notes;
}

export function applyNoteColors(osmd: any, noteColors: Array<{ index: number; color: string }>) {
  if (!osmd) return;

  const allNotes = getAllGraphicalNotes(osmd);
  console.log("Found", allNotes.length, "graphical notes");
  if (!allNotes.length) return;

  // fast lookup map from index -> color
  const colorMap = new Map<number, string>();
  (noteColors || []).forEach(n => colorMap.set(n.index, n.color));

  // Clear previous colors for notes not in map
  // allNotes.forEach((gNote) => {
  //   if (gNote?.sourceNote) {
  //     if (typeof gNote.sourceNote.NoteheadColor !== "undefined") gNote.sourceNote.NoteheadColor = null;
  //     if (gNote.sourceNote?.Notehead) gNote.sourceNote.Notehead.color = null;
  //   }
  // });

  allNotes.forEach((gNote: any, idx: number) => {
    const color = colorMap.get(idx);
    if (!color && color !== "") return; // skip if nothing for this note

    try {
      // 1) Preferred: set OSMD's sourceNote.NoteheadColor
      if (gNote?.sourceNote) {
        if (typeof gNote.sourceNote.NoteheadColor !== "undefined") {
          gNote.sourceNote.NoteheadColor = color;
        } else if (gNote.sourceNote.Notehead) {
          // some versions store the notehead object
          gNote.sourceNote.Notehead.color = color;
        } else {
          // last resort: set attribute on sourceNote
          gNote.sourceNote.color = color;
        }
      }

      // 2) VexFlow fallback: try multiple common APIs safely
      const vf = gNote.vfnote;
      if (vf) {
        if (typeof vf.setStyle === "function") {
          vf.setStyle({ fillStyle: color, strokeStyle: color });
        } else if (typeof vf.setAttribute === "function") {
          // Not common, but harmless if present
          try { vf.setAttribute("fill", color); vf.setAttribute("stroke", color); } catch (e) {}
        } else if (vf.attrs && typeof vf.attrs === "object") {
          // Some VexFlow renderers expose attrs
          vf.attrs.fill = color;
          vf.attrs.stroke = color;
        } else if (vf.style && typeof vf.style === "object") {
          // DOM-like style objects (unlikely directly on vfnote)
          vf.style.fill = color;
        } else {
          // If nothing matches, we do nothing to vfnote — rely on sourceNote change above.
        }
      }

    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("applyNoteColors: failed for index", idx, err);
    }
  });

  try {
    osmd.render();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("osmd.render() failed", e);
  }
}


/**
 * Builds the complete HTML string for rendering OSMD inside a **React Native WebView**.
 *
 * This HTML:
 * - Loads the OSMD script from CDN.
 * - Renders the provided MusicXML.
 * - Implements `window.stepCursor()` for animating the playback cursor by beats.
 * - Extracts beats-per-measure and tempo from the XML.
 * - Posts a `loaded` message back to the React Native layer via `window.ReactNativeWebView.postMessage(...)`.
 *
 * @param xml - MusicXML content to render.
 * @param defaultZoom - Default zoom factor to apply (defaults to 0.45 for mobile).
 * @returns A self-contained HTML string for injection into a WebView.
 */
export function buildOsmdHtmlForNative(mxmlString: string) {
  const escapedXml = mxmlString
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$")
    .replace(/\n/g, "\\n");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <script src="https://cdn.jsdelivr.net/npm/opensheetmusicdisplay@1.8.7/build/opensheetmusicdisplay.min.js"></script>
      <style>
        body { margin: 0; padding: 0; background: #fff; }
        #osmd-container { width: 100%; height: 100%; }
      </style>
    </head>
    <body>
      <div id="osmd-container"></div>
      <script>
        console.log("[WebView] Initializing OpenSheetMusicDisplay...");

        const container = document.getElementById("osmd-container");
        const osm = new opensheetmusicdisplay.OpenSheetMusicDisplay(container, {
          autoResize: true,
          backend: "svg",
          drawTitle: true,
          drawPartNames: true,
          followCursor: false,
        });

        // Load & render
        osm
          .load(\`${escapedXml}\`)
          .then(() => osm.render())
          .then(() => {
            console.log("[WebView] OSMD loaded, initializing cursor...");

            // Initialize and show cursor
            osm.cursor.show();

            const tempo = osm.sheet?.tempo || 100;
            const firstMeasure = osm.sheet?.FirstMeasure;
            const beatsPerMeasure = firstMeasure?.ActiveTimeSignature?.numerator || 4;

            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: "loaded",
              tempo,
              beatsPerMeasure,
            }));

            console.log(\`[WebView] OSMD loaded: tempo=\${tempo}, beatsPerMeasure=\${beatsPerMeasure}\`);
          })
          .catch(e => console.error("OSMD load error", e));


        // ===== Helper: Apply Note Colors (skip rests) =====
        function applyNoteColors(osmd, noteColors) {
          if (!osmd || !osmd.GraphicSheet) return;

          // Get all graphical notes (skip rests, like music21.notes)
          const allGraphicalNotes = [];
          const measureList = osmd.GraphicSheet.MeasureList || [];
          
          for (const staffMeasures of measureList) {
            for (const measure of staffMeasures || []) {
              for (const staffEntry of measure.staffEntries || []) {
                for (const gve of staffEntry.graphicalVoiceEntries || []) {
                  for (const gNote of gve.notes || []) {
                    const src = gNote.sourceNote;
                    if (src && !(src.isRest && src.isRest())) {
                      allGraphicalNotes.push(gNote);
                    }
                  }
                }
              }
            }
          }

          console.log("[WebView] Found", allGraphicalNotes.length, "playable notes");

          // Build fast lookup map
          const colorMap = new Map();
          (noteColors || []).forEach(n => colorMap.set(n.index, n.color));

          // Apply colors using OSMD's sourceNote properties (primary method)
          allGraphicalNotes.forEach((gNote, idx) => {
            const color = colorMap.get(idx);
            if (!color && color !== "") return;

            try {
              // 1) Set sourceNote properties (OSMD's preferred method)
              if (gNote.sourceNote) {
                if (typeof gNote.sourceNote.NoteheadColor !== "undefined") {
                  gNote.sourceNote.NoteheadColor = color;
                } else if (gNote.sourceNote.Notehead) {
                  gNote.sourceNote.Notehead.color = color;
                } else {
                  gNote.sourceNote.color = color;
                }
              }

              // 2) VexFlow fallback for immediate visual update
              const vf = gNote.vfnote;
              if (vf) {
                if (typeof vf.setStyle === "function") {
                  vf.setStyle({ fillStyle: color, strokeStyle: color });
                }
                // Color individual noteheads if available
                if (vf.note_heads && Array.isArray(vf.note_heads)) {
                  vf.note_heads.forEach(head => {
                    if (head.setStyle) {
                      head.setStyle({ fillStyle: color, strokeStyle: color });
                    }
                  });
                }
              }
            } catch (err) {
              console.warn("[WebView] Failed to color note", idx, err);
            }
          });

          // Re-render to apply sourceNote color changes
          try {
            osmd.render();
            console.log("[WebView] Applied", noteColors.length, "note colors and re-rendered");
          } catch (e) {
            console.error("[WebView] osmd.render() failed", e);
          }
        }

        // ===== Cross-Platform Message Listener =====
        function handleRNMessage(event) {
          try {
            const msg = JSON.parse(event.data);
            console.log("[WebView] RN->WebView message:", msg);


            // Handle note coloring
            if (msg.type === "colorNotes" && Array.isArray(msg.noteColors)) {
              applyNoteColors(osm, msg.noteColors);
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: "colorNotesAck",
                count: msg.noteColors.length,
              }));
            }

            // Handle cursor movement
            else if (msg.type === "moveCursor" && typeof msg.targetBeats === "number") {
              moveCursorByBeats(msg.targetBeats);
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: "cursorMovedAck",
                targetBeats: msg.targetBeats,
              }));
            }

          } catch (err) {
            console.error("Bad RN->WebView message", err);
          }
        }

        // ✅ Works in RN
        window.ReactNativeWebView.onMessage = handleRNMessage;

        // ✅ Works in browser preview (for dev)
        window.addEventListener("message", handleRNMessage);
      </script>
    </body>
    </html>
  `;
}

/**
 * Handles messages sent from the OSMD WebView back to React Native.
 *
 * @param raw - Raw message string from the WebView's `postMessage`.
 * @param dispatch - Function to dispatch state updates in React Native.
 * @returns void
 */
export const onHandleOsmdMessageForNative = (raw: string, dispatch: any) => {
  try {
    const data = JSON.parse(raw);

    switch (data.type) {
      // ---- OSMD finished loading ----
      case "loaded":
        dispatch({
          type: "update_piece_info",
          tempo: data.tempo ?? null,
          beatsPerMeasure: data.beatsPerMeasure ?? null,
        });
        console.log(`[WebView] OSMD loaded: tempo=${data.tempo}, beatsPerMeasure=${data.beatsPerMeasure}`);
        break;

      // ---- Console messages (bridge from webview) ----
      case "log":
        const msgText = (data.args || []).join(" ");
        if (data.level === "warn") console.warn("[WebView]", msgText);
        else if (data.level === "error") console.error("[WebView]", msgText);
        else console.log("[WebView]", msgText);
        break;

      // ---- Color note confirmation ----
      case "colorNotesAck":
        console.log(`[WebView] Applied ${data.count} note color updates`);
        // Optionally, you could dispatch an action here:
        // dispatch({ type: "color_notes_applied", count: data.count });
        break;
      
      // ---- Cursor movement confirmation ----
      case "cursorMovedAck":
        console.log(`[WebView] Cursor moved to beat ${data.targetBeats}`);
        break;

      // ---- Unknown message type ----
      default:
        console.warn("[WebView] Unhandled message type:", data.type, data);
        break;
    }
  } catch (e) {
    console.error("Failed to parse WebView message", e, raw);
  }
};

