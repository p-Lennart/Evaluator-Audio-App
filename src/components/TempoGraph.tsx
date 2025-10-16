import React, { useState, useMemo } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  ScrollView,
  Switch,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text as SvgText } from "react-native-svg";

interface TempoGraphProps {
  warpingPath: [number, number][]; // Array of [refIdx, liveIdx]
  refTempo: number; // Reference tempo in BPM
  beatsPerMeasure: number; // Number of beats per measure
  scoreName: string; // Title of the musical score
  disabled: boolean; // Boolean to determine when we disable show tempo graph button
  sampleRate: number; // ScoreFollower's sample rate
  frameSize: number; // ScoreFollower's frame size
}

// Constant used for running average of measures
const SMOOTH_RADIUS = 1;

const TempoGraph: React.FC<TempoGraphProps> = ({
  warpingPath,
  refTempo,
  beatsPerMeasure,
  scoreName,
  disabled,
  sampleRate,
  frameSize,
}) => {
  // Set constant sample rate and frame size based on passed in args
  const SAMPLE_RATE = sampleRate;
  const FRAME_SIZE = frameSize;

  const [showGraph, setShowGraph] = useState(false); // Boolean for showing graph
  const [applySmoothing, setApplySmoothing] = useState(true); // Boolean for smoothing option

  // Map DTW path -> fractional beats + live times
  const beatTimes = useMemo(
    () =>
      warpingPath.map(([refIdx, liveIdx]) => {
        const refTimeSec = (refIdx * FRAME_SIZE) / SAMPLE_RATE; // Convert ref index into ref time
        const liveTimeSec = (liveIdx * FRAME_SIZE) / SAMPLE_RATE; // Convert live index into live time
        const refBeats = (refTimeSec * refTempo) / 60; // Convert ref time into ref beats
        return { refBeats, liveTimeSec }; // Return ref beat paired with respective live time
      }),
    [warpingPath, refTempo]
  );

  // Interpolate -> exact event time per integer beat
  const beatEventTimes = useMemo(() => {
    if (!beatTimes.length) return [];
    const events: number[] = []; // Stores live time for each whole beat
    const lastBeat = Math.floor(beatTimes[beatTimes.length - 1].refBeats); // Find max ref beat stored
    let idx = 0; // Initialize iterator

    for (let b = 0; b <= lastBeat; b++) {
      // Go from beat 0 to max ref beat
      while (idx < beatTimes.length && beatTimes[idx].refBeats < b) idx++; // Go to ref beat with live time pair that is just after beat b
      if (idx < beatTimes.length) {
        const curr = beatTimes[idx]; // Current ref beat - live time pair
        const prev = idx > 0 ? beatTimes[idx - 1] : curr; // Previous pair of current (pair with ref beat just less than beat b)

        const beatDiff = curr.refBeats - prev.refBeats; // Calculate ref beat difference
        const timeDiff = curr.liveTimeSec - prev.liveTimeSec; // Calculate live time difference

        const ratio = beatDiff > 0 ? (b - prev.refBeats) / beatDiff : 0; // Get ratio needed for finding exact live time
        events.push(prev.liveTimeSec + ratio * timeDiff); // Find the exact live time for that whole beat
      }
    }
    return events;
  }, [beatTimes]);

  // Compute raw tempo per measure
  const rawTempoByMeasure = useMemo(() => {
    const events = beatEventTimes; // Array of live times matched to each integer beat i
    const count = Math.floor(events.length / beatsPerMeasure); // Calculate how many measures based on max beats / beats per measure
    const arr: { measure: number; tempo: number }[] = []; // Data structure used to store BPM for each measure number

    for (let m = 0; m < count; m++) {
      // Iterate through each measure

      const t0 = events[m * beatsPerMeasure]; // Find live time that the first note of that measure is played
      const t1 = events[(m + 1) * beatsPerMeasure]; // Find live time that the first note of the next measure is played

      if (t1 > t0) {
        const bpm = (beatsPerMeasure / (t1 - t0)) * 60; // Calculate BPM based on beats per measure over time of measure times 60
        arr.push({ measure: m + 1, tempo: bpm }); // Store BPM of measure in data structure
      }
    }
    return arr;
  }, [beatEventTimes, beatsPerMeasure]);

  // Smooth tempo curve
  const smoothTempo = useMemo(() => {
    const bpms = rawTempoByMeasure.map((m) => m.tempo); // Get BPMs for each measure
    return bpms.map((_, i) => {
      // Go through each BPM
      const start = Math.max(0, i - SMOOTH_RADIUS); // Find index of BPM of the measure before it
      const end = Math.min(bpms.length, i + SMOOTH_RADIUS + 1); // Find index of BPM of the measure ahead of it
      const window = bpms.slice(start, end); // Array of 3 BPM elements
      const avg = window.reduce((sum, v) => sum + v, 0) / window.length; // Find average of the 3
      return avg; // Return avg as BPM of current measure
    });
  }, [rawTempoByMeasure]);

  // Overall tempo
  const overallTempo = useMemo(() => {
    if (beatEventTimes.length < 2) return 0;

    const totalBeats = beatEventTimes.length - 1; // Get total beats
    const totalTime =
      beatEventTimes[beatEventTimes.length - 1] - beatEventTimes[0]; // Get total time
    return totalTime ? (totalBeats / totalTime) * 60 : 0; // Calculate overall BPM based on (total beats / total time) * 60
  }, [beatEventTimes]);

  const displayOverall =
    beatEventTimes.length > 1 ? overallTempo.toFixed(1) : "--"; // Round overall tempo + error handling if no data

  const labels = rawTempoByMeasure.map((m) => m.measure.toString()); // X axis labels

  const bpms = applySmoothing
    ? smoothTempo
    : rawTempoByMeasure.map((m) => m.tempo); // Get correct BPM values per measure based on if smoothing option is on or not
  const data = bpms.map((t) => Number(t.toFixed(1))); // Round those values to 1 decimal place

  const screenW = Dimensions.get("window").width; // Get width of screen
  const chartW = Math.max(screenW - 32, labels.length * 40); // Build chart's min width based on that value

  return (
    <View style={styles.container}>
      {/* Button for showing tempo by measure graph */}
      <TouchableOpacity
        style={[styles.button, disabled && styles.disabledButton]}
        disabled={disabled}
        onPress={() => setShowGraph(true)}
      >
        <Icon name="area-chart" size={16} color="#FFF" />
      </TouchableOpacity>

      {/* Tempo by measure graph */}
      <Modal
        transparent
        animationType="fade"
        visible={showGraph}
        onRequestClose={() => setShowGraph(false)}
      >
        <View style={styles.modalWrapper}>
          <TouchableWithoutFeedback onPress={() => setShowGraph(false)}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>

          {/* Score info - ref tempo, overall soloist tempo, etc.*/}
          <View style={styles.popupContainer}>
            <Text
              style={styles.popupTitle}
            >{`${scoreName} — Tempo by Measure`}</Text>

            {/* Smoothing option for graph*/}
            <View style={styles.filterContainer}>
              <Text style={styles.filterLabel}>Smoothing:</Text>
              <Switch
                value={applySmoothing}
                onValueChange={setApplySmoothing}
              />
              <Text style={styles.filterLabel}>
                {applySmoothing ? "On" : "Off"}
              </Text>
            </View>

            {/* Data display: score tempo vs. your overall tempo*/}
            <Text style={styles.infoText}>Ref Tempo: {refTempo} BPM</Text>
            <Text style={styles.infoText}>Overall: {displayOverall} BPM</Text>

            {/* Graph display */}
            <View style={styles.chartArea}>
              {/* Y label */}
              <Text style={styles.yAxisLabel}>Tempo (BPM)</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator>
                <LineChart
                  data={{ labels, datasets: [{ data }] }} // Pass in x and y values into graph
                  width={chartW}
                  height={200}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chart}
                  fromZero
                  yLabelsOffset={10}
                  xLabelsOffset={-10}
                  renderDotContent={({ x, y, index }) => (
                    <SvgText
                      key={index}
                      x={x}
                      y={y - 8} // shift text a bit above the dot
                      fontSize="10"
                      fill="#000"
                      textAnchor="middle" // center horizontally
                    >
                      {data[index]}
                    </SvgText>
                  )}
                />
              </ScrollView>
            </View>
            {/* X label*/}

            <Text style={styles.xAxisLabel}>Measure Number</Text>

            {/* Button for hiding tempo by measure graph */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowGraph(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Chart configuration info
const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(30,144,255,${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForDots: { r: "4", strokeWidth: "1", stroke: "#1e90ff" },
};

// Define styles for the components using StyleSheet
const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    backgroundColor: "transparent",
  },
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#2C3E50",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: { color: "#FFF", fontWeight: "bold", fontSize: 12 },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  popupContainer: {
    width: "85%",
    maxHeight: "80%",
    padding: 20,
    backgroundColor: "#FCFCFC",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  filterLabel: {
    marginHorizontal: 6,
    fontSize: 15,
    fontWeight: "600",
  },
  infoText: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 4,
  },
  chartArea: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  yAxisLabel: {
    transform: [{ rotate: "-90deg" }],
    fontSize: 8,
    fontWeight: "700",
  },
  chart: {
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  dotLabel: {
    position: "absolute",
    fontSize: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 3,
    borderRadius: 4,
  },
  xAxisLabel: {
    fontSize: 8,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 8,
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#2C3E50",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#555",
  },
});

export default TempoGraph;
