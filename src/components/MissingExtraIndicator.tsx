import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Platform,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { decode as atob } from "base-64";
import { Midi } from "@tonejs/midi";

const midiFiles = {
  ode_to_joy_baseline: require("../../assets/midi/ode_to_joy_baseline.mid"),
  "performance.mid": require("../../assets/midi/performance.mid"),
  "performance1.mid": require("../../assets/midi/performance1.mid"),
  "performance2.mid": require("../../assets/midi/performance2.mid"),
} as const;

type MidiFileKey = keyof typeof midiFiles;

export function MissingExtraIndicator() {
  const [refFile, setRefFile] = useState<MidiFileKey | null>(null);
  const [perfFile, setPerfFile] = useState<MidiFileKey | null>(null);
  const [result, setResult] = useState("");

  // Extract pitch count from MIDI
  const extractNoteCounts = (midi: Midi): Record<string, number> => {
    const noteCount: Record<string, number> = {};
    midi.tracks.forEach((track) => {
      track.notes.forEach((note) => {
        if (note.name) {
          noteCount[note.name] = (noteCount[note.name] || 0) + 1;
        }
      });
    });
    return noteCount;
  };

  // Compare pitch counts
  const compareNoteCounts = (
    refCounts: Record<string, number>,
    perfCounts: Record<string, number>,
  ) => {
    const allPitches = new Set([
      ...Object.keys(refCounts),
      ...Object.keys(perfCounts),
    ]);
    const missing: string[] = [];
    const extra: string[] = [];

    for (let pitch of allPitches) {
      const ref = refCounts[pitch] || 0;
      const perf = perfCounts[pitch] || 0;

      if (perf < ref) {
        missing.push(`${pitch} (missing ${ref - perf})`);
      } else if (perf > ref) {
        extra.push(`${pitch} (extra ${perf - ref})`);
      }
    }

    return { missing, extra };
  };

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

  const handleCompare = async () => {
    if (!refFile || !perfFile) {
      setResult("Please select both reference and performance files.");
      return;
    }

    try {
      const refMidi = await loadMidiFromAsset(midiFiles[refFile]);
      const perfMidi = await loadMidiFromAsset(midiFiles[perfFile]);

      const refCounts = extractNoteCounts(refMidi);
      const perfCounts = extractNoteCounts(perfMidi);

      const { missing, extra } = compareNoteCounts(refCounts, perfCounts);

      setResult(
        `Missing Notes:\n${missing.length ? missing.join("\n") : "None"}\n\n` +
          `Extra Notes:\n${extra.length ? extra.join("\n") : "None"}`,
      );
    } catch (err) {
      console.error(err);
      setResult("Error reading MIDI files.");
    }
  };

  const fileOptions = Object.keys(midiFiles).map((f) => ({
    label: f,
    value: f,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Reference File</Text>
      <RNPickerSelect
        onValueChange={(val) => setRefFile(val as MidiFileKey)}
        items={fileOptions}
        placeholder={{ label: "Select Reference MIDI", value: null }}
      />
      <Text style={styles.label}>Performance File</Text>
      <RNPickerSelect
        onValueChange={(val) => setPerfFile(val as MidiFileKey)}
        items={fileOptions}
        placeholder={{ label: "Select Performance MIDI", value: null }}
      />
      <Button title="Compare MIDI Files" onPress={handleCompare} />
      <ScrollView style={styles.scrollResult}>
        <Text style={styles.result}>{result}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
  },
  label: {
    marginTop: 10,
    fontWeight: "bold",
  },
  scrollResult: {
    marginTop: 20,
    maxHeight: 250,
  },
  result: {
    fontSize: 16,
  },
});
