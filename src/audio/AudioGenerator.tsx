// // NOTE: Component was only created to obtain wav files from given MIDIs but we no longer need it since we can just get wav files directly
// import React, { useEffect, useState, useRef } from "react";
// import { View, StyleSheet } from "react-native";
// import { WebView } from "react-native-webview";
// import { Asset } from "expo-asset";
// import * as FileSystem from "expo-file-system";

// type Props = {
//   midiModule: number | null; // MIDI module reference number passed in as prop (maps to MIDI file)
//   dispatch?: Function; // Optional dispatch function for sending generated audio URIs back upstream
// };

// const AudioGenerator: React.FC<Props> = ({ midiModule, dispatch }) => {
//   const playWebviewRef = useRef<WebView>(null); // Ref to the playback WebView for sending play commands
//   const genWebviewRef = useRef<WebView>(null); // Ref to the offline generator WebView for WAV rendering
//   const [midiBase64, setMidiBase64] = useState<string | null>(null); // Stores Base64-encoded MIDI data
//   const [readyToGenerate, setReadyToGenerate] = useState(false); // Indicates generator WebView is ready

//   // HTML payload for playback WebView:
//   // - Loads Soundfont-Player and Tone.js MIDI parser
//   // - Creates AudioContext and loads 'violin' SoundFont
//   // - Waits for 'play-midi' messages and plays the lowest-pitch track
//   const playHtml = `
//     <!DOCTYPE html>
//     <html><head><meta name="viewport" content="initial-scale=1.0"/></head><body>
//     <script src="https://unpkg.com/soundfont-player/dist/soundfont-player.js"></script>
//     <script src="https://unpkg.com/@tonejs/midi"></script> <!-- Only includes the MIDI parser, not full Tone.js library -->
//     <script>(function(){
//       // Create native Web Audio context
//       const ctx = new (window.AudioContext||window.webkitAudioContext)();
//       let instr;

//       // Load a violin instrument via Soundfont
//       Soundfont.instrument(ctx, 'violin')
//         .then(i => {
//           instr = i;
//           // Notify React Native that playback WebView is ready
//           window.ReactNativeWebView.postMessage('ready');
//         });

//       function handle(e) {
//         try {
//           const msg = JSON.parse(e.data);
//           if (msg.type === 'play-midi' && instr) {
//             const bin = atob(msg.data);                // Decode Base64 MIDI data to binary string
//             const buf = new Uint8Array(bin.length);
//             for (let j = 0; j < bin.length; j++) buf[j] = bin.charCodeAt(j);
//             const midi = new Midi(buf.buffer);         // Parse MIDI via Tone.js parser

//             // Compute average pitch per track to pick lowest-voiced track
//             const tracks = midi.tracks.map(t => ({
//               t,
//               avg: t.notes.length
//                 ? t.notes.reduce((s, n) => s + n.midi, 0) / t.notes.length
//                 : Infinity
//             }));
//             tracks.sort((a, b) => a.avg - b.avg);
//             const bottom = tracks[0].t;

//             // Schedule each note for playback (start after small delay)
//             const now = ctx.currentTime + 0.1;
//             bottom.notes.forEach(n =>
//               instr.play(n.name, now + n.time, {
//                 duration: n.duration,
//                 loop: true,
//                 release: 0.5
//               })
//             );
//           }
//         } catch (err) {
//           // Optionally send error back to React Native for debugging
//           // window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', message: err.message }));
//           console.error(err);
//         }
//       }

//       // Listen on both document and window for cross-platform compatibility
//       document.addEventListener('message', handle);
//       window.addEventListener('message', handle);
//     })();</script>
//     </body></html>
//   `;

//   // HTML payload for offline WAV generation WebView:
//   // - Loads Tone.js MIDI parser and Soundfont
//   // - Exposes functions to encode rendered audio as WAV and Base64
//   // - Generates separate top & bottom voice WAVs and posts them back
//   const genHtml = `
//     <!DOCTYPE html><body>
//     <script src="https://unpkg.com/@tonejs/midi@2.0.27/build/Midi.js"></script>
//     <script src="https://unpkg.com/soundfont-player/dist/soundfont-player.js"></script>
//     <script>
//     (function(){
//       // Notify React Native generator WebView is ready
//       window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'ready-to-generate' }));

//       // Helper to write ASCII strings into DataView
//       function writeString(view, offset, str) {
//         for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
//       }

//       // Encode OfflineAudioContext render buffer into WAV file format
//       function encodeWAV(buffer) {
//         const numCh = 1,
//               sr = buffer.sampleRate,
//               samples = buffer.getChannelData(0);
//         const buf = new ArrayBuffer(44 + samples.length * 2),
//               view = new DataView(buf);
//         writeString(view, 0, 'RIFF'); view.setUint32(4, 36 + samples.length * 2, true);
//         writeString(view, 8, 'WAVE'); writeString(view, 12, 'fmt ');
//         view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, numCh, true);
//         view.setUint32(24, sr, true); view.setUint32(28, sr * numCh * 2, true);
//         view.setUint16(32, numCh * 2, true); view.setUint16(34, 16, true);
//         writeString(view, 36, 'data'); view.setUint32(40, samples.length * 2, true);
//         let off = 44;
//         for (let i = 0; i < samples.length; i++) {
//           const s = Math.max(-1, Math.min(1, samples[i]));
//           view.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
//           off += 2;
//         }
//         return buf;
//       }

//       // Render a track offline and return Base64-encoded WAV
//       async function renderTrack(track) {
//         const last = track.notes[track.notes.length - 1];
//         const dur = last.time + last.duration + 1;
//         const ctx = new OfflineAudioContext(1, dur * 44100, 44100);
//         const instr = await Soundfont.instrument(ctx, 'violin');
//         track.notes.forEach(n =>
//           instr.play(n.name, n.time, { duration: n.duration, loop: true, release: 0.5 })
//         );
//         const rendered = await ctx.startRendering();
//         const wavBuf = encodeWAV(rendered);
//         const arr = new Uint8Array(wavBuf);
//         let str = '';
//         arr.forEach(b => str += String.fromCharCode(b));
//         return btoa(str);
//       }

//       // Listen for generate requests from React Native
//       window.addEventListener('message', async e => {
//         try {
//           const msg = JSON.parse(e.data);
//           if (msg.type !== 'generate-wav') return;

//           const bin = atob(msg.data);
//           const u8 = new Uint8Array(bin.length);
//           for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
//           const midi = new Midi(u8.buffer);

//           // Separate top and bottom voice tracks
//           const topTrack = midi.tracks[0];
//           const tracksWithAvg = midi.tracks.map(t => ({
//             t,
//             avg: t.notes.length
//               ? t.notes.reduce((s, n) => s + n.midi, 0) / t.notes.length
//               : Infinity
//           }));
//           tracksWithAvg.sort((a, b) => a.avg - b.avg);
//           const bottomTrack = tracksWithAvg[0].t;

//           // Generate WAVs in parallel
//           const [topB64, bottomB64] = await Promise.all([
//             renderTrack(topTrack),
//             renderTrack(bottomTrack),
//           ]);

//           // Send back both WAVs to React Native
//           window.ReactNativeWebView.postMessage(JSON.stringify({
//             type: 'generated-wavs', top: topB64, bottom: bottomB64
//           }));
//         } catch (err) {
//           console.error(err);
//         }
//       });
//     })();
//     </script>
//     </body>
//   `;

//   // Load & encode MIDI asset when component mounts or midiModule changes
//   useEffect(() => {
//     if (!midiModule) return;
//     (async () => {
//       const asset = Asset.fromModule(midiModule); // Gets reference to bundled MIDI asset
//       await asset.downloadAsync(); // Ensures it's available locally
//       const uri = asset.localUri || asset.uri; // Use local URI when possible
//       const b64 = await FileSystem.readAsStringAsync(uri, {
//         encoding: FileSystem.EncodingType.Base64,
//       });
//       setMidiBase64(b64); // Save Base64 MIDI string to state
//     })();
//   }, [midiModule]);

//   // Trigger WAV generation once WebView is ready and MIDI is loaded
//   useEffect(() => {
//     if (readyToGenerate && midiBase64) {
//       genWebviewRef.current?.postMessage(
//         JSON.stringify({ type: "generate-wav", data: midiBase64 }),
//       );
//     }
//   }, [readyToGenerate, midiBase64]);

//   // Handle incoming messages from generator WebView
//   const onGenMessage = (e: any) => {
//     const msg = JSON.parse(e.nativeEvent.data || "{}");
//     if (msg.type === "generated-wavs") {
//       const ts = Date.now();
//       const topUri = FileSystem.documentDirectory + `top_${ts}.wav`;
//       const bottomUri = FileSystem.documentDirectory + `bottom_${ts}.wav`;

//       FileSystem.writeAsStringAsync(topUri, msg.top, {
//         encoding: FileSystem.EncodingType.Base64,
//       })
//         .then(() =>
//           dispatch?.({
//             type: "change_reference_audio",
//             referenceAudioUri: topUri,
//           }),
//         )
//         .catch((err) =>
//           console.error("[AudioGenerator] write top error:", err),
//         );

//       FileSystem.writeAsStringAsync(bottomUri, msg.bottom, {
//         encoding: FileSystem.EncodingType.Base64,
//       })
//         .then(() =>
//           dispatch?.({
//             type: "change_bottom_audio",
//             bottomAudioUri: bottomUri,
//           }),
//         )
//         .catch((err) =>
//           console.error("[AudioGenerator] write bottom error:", err),
//         );
//     } else if (msg.type === "ready-to-generate") {
//       setReadyToGenerate(true); // Generator WebView signaled readiness
//     }
//   };

//   // Send play command to playback WebView
//   // const handlePlay = () => {
//   //   if (!midiBase64) return;
//   //   playWebviewRef.current?.postMessage(
//   //     JSON.stringify({ type: "play-midi", data: midiBase64 }),
//   //   );
//   // };

//   // Do not render UI until MIDI data is loaded
//   if (!midiBase64) return null;

//   return (
//     <View style={styles.container}>
//       {/* Play button for companion playback */}
//       {/* <TouchableOpacity style={[styles.button, { backgroundColor: '#2C3E50' }]} onPress={handlePlay}>
//         <Text style={styles.button_text}>Play Companion Playback</Text>
//       </TouchableOpacity> */}

//       {/* Hidden WebView for real-time playback */}
//       <WebView
//         ref={playWebviewRef}
//         originWhitelist={["*"]}
//         source={{ html: playHtml }}
//         allowsInlineMediaPlayback
//         mediaPlaybackRequiresUserAction={false}
//         mixedContentMode="always"
//         style={styles.hiddenWebview}
//       />

//       {/* Hidden WebView for offline WAV generation */}
//       <WebView
//         ref={genWebviewRef}
//         originWhitelist={["*"]}
//         source={{ html: genHtml }}
//         onMessage={onGenMessage}
//         style={styles.hiddenWebview}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { marginTop: 8 },
//   hiddenWebview: { width: 0, height: 0, opacity: 0 },
//   button: {
//     padding: 10,
//     borderRadius: 8,
//     alignItems: "center",
//     marginVertical: 5,
//     // Shadow style for button elevation
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.17,
//     shadowRadius: 3.05,
//     elevation: 4,
//   },
//   button_text: {
//     textAlign: "center",
//     fontSize: 14,
//     color: "#FFF",
//     fontWeight: "bold",
//   },
// });

// export default AudioGenerator;
