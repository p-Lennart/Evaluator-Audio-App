import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { decode as atob } from "base-64";
import { Midi } from "@tonejs/midi";
import { WebView } from "react-native-webview";
import { musicXMLString } from "./exampleMusicXML";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";

const midiAsset = require("../../assets/midi/ode_to_joy_baseline.mid");
const intonationArray = [
  0.1, -0.2, 0.0, -0.5, 1.0, 0.1, -0.2, 0.0, -0.5, 1.0, 0.1, -0.2, 0.0, -0.5,
  1.0, 0.1, -0.2, 0.0, -0.5, 1.0, 0.1, -0.2, 0.0, -0.5, 1.0, 0.1, -0.2, 0.0,
  -0.5, 1.0, 0.1, -0.2, 0.0, -0.5, 1.0, 0.1, -0.2, 0.0, -0.5, 1.0, 0.1, -0.2,
  0.0, -0.5, 1.0, 0.1, -0.2, 0.0, -0.5, 1.0, 0.1, -0.2, 0.0, -0.5, 1.0, 0.1,
  -0.2, 0.0, -0.5, 1.0,
];

type MidiNoteInfo = {
  name: string;
};

export default function MusicXMLNoteSelector() {
  const [midiNotes, setMidiNotes] = useState<MidiNoteInfo[]>([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState<
    number | undefined
  >(undefined);
  const [markedXML, setMarkedXML] = useState<string | null>(null);

  const osmdContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMidi();
  }, []);

  useEffect(() => {
    if (Platform.OS === "web" && markedXML && osmdContainerRef.current) {
      const osmd = new OpenSheetMusicDisplay(osmdContainerRef.current, {
        autoResize: true,
        backend: "svg",
      });
      // osmd.load(markedXML).then(() => osmd.render());
      osmd
        .load(markedXML)
        .then(() => osmd.render())
        .catch((e) => {
          console.error("OSMD load error:", e);
        });
    }
  }, [markedXML]);

  const loadMidiFromAsset = async (assetPath: number): Promise<Midi> => {
    const asset = Asset.fromModule(assetPath);
    await asset.downloadAsync();
    const uri = asset.localUri || asset.uri;

    if (Platform.OS === "web") {
      const response = await fetch(uri);
      const arrayBuffer = await response.arrayBuffer();
      return new Midi(new Uint8Array(arrayBuffer));
    } else {
      const midiData = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const binary = atob(midiData);
      const buffer = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        buffer[i] = binary.charCodeAt(i);
      }
      return new Midi(buffer);
    }
  };

  // const loadMidi = async () => {
  //   try {
  //     const midi = await loadMidiFromAsset(midiAsset);
  //     const notes = midi.tracks.flatMap((track) =>
  //       track.notes.map((note) => ({
  //         name: note.name,
  //       }))
  //     );
  //     setMidiNotes(notes);
  //   } catch (e) {
  //     console.error('Failed to load MIDI:', e);
  //   }
  // };

  const loadMidi = async () => {
    try {
      const midi = await loadMidiFromAsset(midiAsset);
      const notes = midi.tracks.flatMap((track) =>
        track.notes.map((note) => ({
          name: note.name,
        })),
      );
      setMidiNotes(notes);

      const fullMarkedXML = highlightAllNotesByIntonationArray(
        musicXMLString,
        notes,
        intonationArray,
      );
      setMarkedXML(fullMarkedXML);
    } catch (e) {
      console.error("Failed to load MIDI or highlight notes:", e);
    }
  };

  const highlightAllNotesByIntonationArray = (
    xml: string,
    midiNotes: MidiNoteInfo[],
    intonations: number[],
  ): string => {
    let updatedXML = xml;

    for (let i = 0; i < intonations.length; i++) {
      const intonation = intonations[i];
      if (intonation === 0) continue;
      const note = midiNotes[i];
      const step = note.name[0];
      const octave = parseInt(note.name.slice(-1));
      const samePitchIndex = midiNotes
        .slice(0, i)
        .filter((n) => n.name === note.name).length;
      const color = intonations[i] < 0 ? "#0000FF" : "#FF0000";

      updatedXML = markSingleNoteInMusicXMLByIndex(
        updatedXML,
        { step, octave },
        samePitchIndex,
        color,
      );
    }

    return updatedXML;
  };

  // const getIndexAmongSamePitches = (notes: MidiNoteInfo[], index: number) => {
  //   const targetName = notes[index].name;
  //   return notes.slice(0, index).filter((n) => n.name === targetName).length;
  // };

  // const handleNoteSelect = (index: number | undefined) => {
  //   setSelectedNoteIndex(index);
  //   if (index !== undefined) {
  //     const selectedNote = midiNotes[index];
  //     const step = selectedNote.name[0];
  //     const octave = parseInt(selectedNote.name.slice(-1));
  //     const pitchIndex = getIndexAmongSamePitches(midiNotes, index);
  //     const updated = markSingleNoteInMusicXMLByIndex(musicXMLString, { step, octave }, pitchIndex);
  //     setMarkedXML(updated);
  //   } else {
  //     setMarkedXML(null);
  //   }
  // };

  const markSingleNoteInMusicXMLByIndex = (
    xml: string,
    target: { step: string; octave: number },
    targetIndex: number,
    highlightColor: string,
  ): string => {
    const lines = xml.split("\n");
    let inNote = false;
    let stepMatched = false;
    let octaveMatched = false;
    let currentStep = "";
    let currentOctave = "";
    let matchCounter = 0;
    let buffer: string[] = [];
    let output: string[] = [];

    for (let line of lines) {
      if (line.includes("<note")) {
        inNote = true;
        buffer = [line];
      } else if (inNote) {
        buffer.push(line);
      } else {
        output.push(line);
        continue;
      }

      if (line.includes("<step>")) {
        currentStep = line.replace(/.*<step>(.*?)<\/step>.*/, "$1");
        stepMatched = true;
      }

      if (line.includes("<octave>")) {
        currentOctave = line.replace(/.*<octave>(.*?)<\/octave>.*/, "$1");
        octaveMatched = true;
      }

      if (line.includes("</note>")) {
        inNote = false;

        if (stepMatched && octaveMatched) {
          if (
            currentStep === target.step &&
            parseInt(currentOctave) === target.octave
          ) {
            if (matchCounter === targetIndex) {
              const modified = buffer.map((l, i) => {
                if (
                  i === 0 &&
                  l.trim().startsWith("<note") &&
                  !l.includes("color=")
                ) {
                  return l.replace("<note", `<note color="${highlightColor}"`);
                }
                return l;
              });

              output.push(...modified);
            } else {
              output.push(...buffer);
            }
            matchCounter++;
          } else {
            output.push(...buffer);
          }
        } else {
          output.push(...buffer);
        }

        buffer = [];
        stepMatched = false;
        octaveMatched = false;
      }
    }

    return output.join("\n");
  };

  const buildHtml = (xml: string) => {
    const escaped = xml
      .replace(/`/g, "\\`")
      .replace(/<\/script>/g, "<\\/script>");
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            html, body { margin: 0; padding: 0; background: white; }
            #osmd-container { width: 100%; height: 100%; padding: 10px; }
          </style>
        </head>
        <body>
          <div id="osmd-container"></div>
          <script src="https://unpkg.com/opensheetmusicdisplay/build/opensheetmusicdisplay.min.js"></script>
          <script>
            (async () => {
              const osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay("osmd-container", {
                autoResize: true,
                backend: "svg"
              });
              await osmd.load(\`${escaped}\`);
              osmd.render();
            })();
          </script>
        </body>
      </html>
    `;
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <Text style={styles.header}> Select an Exact MIDI Note to Mark:</Text>

      <RNPickerSelect
        onValueChange={handleNoteSelect}
        value={selectedNoteIndex}
        placeholder={{ label: 'Select a note...', value: undefined }}
        items={midiNotes.map((note, index) => ({
          label: `${note.name} [#${index}]`,
          value: index,
          key: `${note.name}-${index}`,
        }))}
        style={{
          inputIOS: styles.picker,
          inputAndroid: styles.picker,
        }}
      /> */}

      {markedXML && (
        <>
          <Text style={styles.header}> Rendered MusicXML</Text>

          {Platform.OS === "web" ? (
            <View style={styles.webContainer}>
              <div ref={osmdContainerRef} style={{ width: "100%" }} />
            </View>
          ) : (
            <View style={{ height: 300 }}>
              <WebView
                originWhitelist={["*"]}
                javaScriptEnabled
                source={{ html: buildHtml(markedXML) }}
                style={{ backgroundColor: "white" }}
              />
            </View>
          )}

          <Text style={styles.header}> Raw Marked MusicXML</Text>
          {/* <ScrollView style={styles.xmlBox}>
            <Text selectable style={{ fontSize: 12 }}>
              {markedXML}
            </Text>
          </ScrollView> */}
        </>
      )}
    </View>
  );
}

// ... styles remain unchanged

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  notesBox: {
    maxHeight: 150,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  picker: {
    fontSize: 16,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  xmlBox: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fdf6e3",
    borderTopWidth: 1,
    borderColor: "#ccc",
    margin: 10,
    borderRadius: 5,
  },
  webContainer: {
    flex: 1,
    minHeight: 300,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
});
