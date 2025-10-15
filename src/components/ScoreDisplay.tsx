import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import { Cursor, OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import scoresData from "../score_name_to_data_map/scoreToMusicxmlMap"; // Local mapping of score filenames to XML content
import { WebView } from "react-native-webview";
import {
  advanceToNextBeat,
  buildOsmdHtmlForNative,
  initOsmdWeb,
  onHandleOsmdMessageForNative,
  peekAtCurrentBeat,
} from "../utils/osmdUtils"; // Helper functions used to manipulate the OSMD Display

export default function ScoreDisplay({
  state,
  dispatch,
}: {
  state: any;
  dispatch: any;
}) {
  const osmContainerRef = useRef<HTMLDivElement | null>(null); // Reference for the SVG container (Web reference to container)
  const cursorRef = useRef<Cursor | null>(null); // Create reference to the OSMD cursor
  const osdRef = useRef<OpenSheetMusicDisplay | null>(null); // Create ref to the OSMD object for web
  const webviewRef = useRef<WebView>(null); // Native-only ref (Used to inject html code into since OSMD is only supported through browser)
  const [steps, setSteps] = useState<string>(""); // state for declaring number of intended cursor iterations
  const [speed, setSpeed] = useState<string>(""); // state solely used for testing cursor movement logic using the commented out code for input in the return below
  const [pitch, setPitch] = useState<string>(""); // state for declaring number of intended cursor iterations
  const movedBeats = useRef<number>(0); // ref to store current beat position (used ref instead of state to prevent multiple refreshes)
  const animRef = useRef<number | null>(null); // ref to store current animation id
  const overshootBeats = useRef<number>(0); // How much beat value have we gone over by when going to next note and adding it's beat value (can ignore this - variable probably always 0 due to new implementation of movement logic)

  // Determine if we need to update styles if screen is below a certain threshold
  const { width, height } = useWindowDimensions();
  const isSmallScreen = width < 960;

  const moveCursorByBeats = () => {
    const targetBeats = parseFloat(steps); // Beat value that we want the cursor to be at

    // Cancel any previous animation frame before starting a new one (good for concecutive rerenders)
    if (animRef.current !== null) {
      cancelAnimationFrame(animRef.current);
    }

    // MOBILE branch: send JS into the WebView to move the cursor (same logic as the web one, can be seen from buildOsmdHtmlForNative helper function)
    if (Platform.OS !== "web") {
      webviewRef.current?.injectJavaScript(
        `window.stepCursor(${parseFloat(steps)}); true;`,
      );
      return;
    }

    // --- WEB branch ---
    if (!osdRef.current!.IsReadyToRender()) {
      console.warn("Please call load() and render() before stepping cursor."); //  Make sure the OSD system is ready before moving the cursor
      return;
    }
    const measures = osdRef.current!.GraphicSheet.MeasureList; // Get the list of measures from the rendered music sheet
    if (!measures.length || !measures[0].length) return; // Exit if no measures are found

    // Get the denominator of the current time signature (e.g., 4 for 4/4)
    const denom =
      measures[0][0].parentSourceMeasure.ActiveTimeSignature!.Denominator;

    // Get the voices currently under the cursor for the first instrument (only 1 instrument - Evaluator)
    let initialBeats = movedBeats.current;
    if (movedBeats.current === 0) {
      initialBeats = peekAtCurrentBeat(
        cursorRef.current!,
        osdRef.current!.Sheet.Instruments,
        denom,
      ); // Intialbeats = beat value of the current note that the cursor is on
    }
    movedBeats.current = initialBeats; // This is accounting for the first note that the cursor highlights at the beginning
    console.log("movedBeats :", movedBeats);

    // Calculate how many beats we need to move forward
    const toMove = Math.max(0, targetBeats);

    // Initialize moved beats from React state (current beat position)
    let moved = movedBeats.current + overshootBeats.current; // overshootBeats should always be 0 due do our current movement logic (no longer using estimated beat computed from path but given from csv when we reach a certain timestamp)
    overshootBeats.current = 0;

    // Recursive function to advance the cursor step-by-step
    const stepFn = () => {
      // Stop if we've moved enough beats
      if (moved >= toMove) {
        const leftover = moved - toMove;
        overshootBeats.current = leftover;
        movedBeats.current = toMove;
        
        const renderStart = performance.now();
        osdRef.current!.render(); // Re-render
        const renderEnd = performance.now();
        const renderDuration = renderEnd - renderStart;
        
        const moveStartTime = (window as any).__lastMoveStartTime;
        const totalOsmdLag = moveStartTime ? renderEnd - moveStartTime : null;
        
        console.log(`[TIMING] OSMD Render Complete (FINAL): Beat ${toMove}, Render duration=${renderDuration.toFixed(2)}ms, Total OSMD lag=${totalOsmdLag ? totalOsmdLag.toFixed(2) : 'N/A'}ms`);
        return;
      }

      let delta = advanceToNextBeat(
        // Move cursor to next note and return the beat value of that next note
        cursorRef.current!,
        osdRef.current!.Sheet.Instruments,
        denom,
      );

      moved += delta; // Accumulate the moved beats
      movedBeats.current = moved; // Update reference

      const renderStart = performance.now();
      osdRef.current!.render();
      const renderEnd = performance.now();
      const renderDuration = renderEnd - renderStart;
      
      console.log(`[TIMING] OSMD Render (STEP): Beat ${moved.toFixed(2)}, Render duration=${renderDuration.toFixed(2)}ms`);
      
      animRef.current = requestAnimationFrame(stepFn); // Schedule a new animation frame and store its ID (better alternative to setTimeout)
    };
    stepFn(); // Start the step loop
  };

  // Cursor movement effect
  useEffect(() => {
    const beat = state.estimatedBeat; // Get beat from global state
    if (typeof beat !== "number") return; // Only proceed if beat is valid
    
    const receiveTimestamp = performance.now();
    const dispatchTimestamp = (window as any).__lastDispatchTime;
    const dispatchLag = dispatchTimestamp ? receiveTimestamp - dispatchTimestamp : null;
    
    console.log(`[TIMING] Dispatch Received: Beat ${beat}, Receive time=${receiveTimestamp.toFixed(2)}ms, Dispatch lag=${dispatchLag ? dispatchLag.toFixed(2) : 'N/A'}ms`);
    
    setSteps(String(beat)); // Update step state (beat value we are trying to move the cursor to)
  }, [state.estimatedBeat]); // Queue when global beat value changes

  // Chained cursor movement effect
  useEffect(() => {
    if (steps === "") return; // Chained useeffect to have steps state updated properly before running the cursor movement logic
    
    const moveStartTimestamp = performance.now();
    const receiveTimestamp = (window as any).__lastDispatchTime ? (window as any).__lastDispatchTime + ((window as any).__lastDispatchLag || 0) : null;
    
    console.log(`[TIMING] Move Cursor Start: Beat ${steps}, Start time=${moveStartTimestamp.toFixed(2)}ms`);
    (window as any).__lastMoveStartTime = moveStartTimestamp;
    
    moveCursorByBeats(); // Cursor movement using the latest step
  }, [steps, speed]); // Queue when step or speed state (speed var only applicable on testing input) changes

  // Note coloring effect
  useEffect(() => {
    if (typeof state.estimatedPitch !== "number") return;
    if (!osdRef.current || !cursorRef.current) return;

    const instruments = osdRef.current.Sheet.Instruments;
    const voices = cursorRef.current.VoicesUnderCursor(instruments[0]);
    if (voices.length && voices[0].Notes.length) {
      const note = voices[0].Notes[0];

      console.log("Coloring by estimated pitch: ", state.estimatedPitch);
      if (state.estimatedPitch < 0) {
        note.NoteheadColor = "#FF0000";
      } else if (state.estimatedPitch > 0) {
        note.NoteheadColor = "#00FF00";
      } else {
        note.NoteheadColor = "#000000";
      }
      osdRef.current.render(); // refresh sheet with coloring applied
    }
  }, [state.estimatedBeat, state.estimatedPitch]);

  // Web-only initialization
  useEffect(() => {
    initOsmdWeb(
      osmContainerRef,
      osdRef,
      cursorRef,
      state,
      dispatch,
      isSmallScreen,
    ); // Initializes osdRef and cursorRef
  }, [dispatch, state.score, state.scores]);

  const selectedXml =
    (state.scoreContents && state.scoreContents[state.score]) ||
    scoresData[state.score] ||
    ""; // Get selected xml data from given the current score's name

  return (
    <>
      {/* Temporary inputs for testing cursor movement */}
      {/* <TextInput
        value={steps}
        onChangeText={setSteps}
        keyboardType="numeric"
        placeholder="Number Of Steps"
      />
      <TextInput
        value={speed}
        onChangeText={setSpeed}
        keyboardType="numeric"
        placeholder="Cursor Update Speed (ms)"
      />

      <TouchableOpacity 
      onPress={moveCursorByBeats}
      >
        <Text>Start</Text>
      </TouchableOpacity> */}

      {/* Reference ScrollView Component for controlling scroll */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator
        scrollEventThrottle={16}
      >
        {/* If on web, render the OSMD container like normal */}
        {Platform.OS === "web" ? (
          <div ref={osmContainerRef} style={styles.osmContainer} />
        ) : (
          // Otherwise use WebView component to render OSMD since it only has web base support so injecting html is the only way
          <WebView
            ref={webviewRef}
            originWhitelist={["*"]}
            source={{ html: buildOsmdHtmlForNative(selectedXml) }} // Initialize OSMD display and its own separate cursor mvoement logic (same as web)
            onMessage={(e) =>
              onHandleOsmdMessageForNative(e.nativeEvent.data, dispatch)
            } // Call function when page inside this Webview calls postMessage
            style={{ backgroundColor: "transparent", height: 400 }}
          />
        )}

        {state.loadingPerformance && ( // Loading overlay
          <View style={styles.overlay}>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingText}>Loading…</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

// Define styles for the components using StyleSheet
const styles = StyleSheet.create({
  scrollContainer: {
    width: "100%", // Make the scroll container fill the width of the parent
    height: "100%", // Set a specific height for scrolling (adjust as needed)
  },
  osmContainer: {
    width: "100%", // Make the sheet music container fill the width of the parent
    borderWidth: 1, // Add border to the sheet music container
    borderColor: "black", // Set border color to black
    overflow: "hidden", // Ensure content doesn't overflow outside this container
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    color: "#2C3E50",
  },

  // Below styles used to have a loading indicator on the top of the OSMD display
  sheetWrapper: {
    position: "relative", // to contain overlay
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    padding: 16,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#333",
    fontWeight: 700,
  },
});
