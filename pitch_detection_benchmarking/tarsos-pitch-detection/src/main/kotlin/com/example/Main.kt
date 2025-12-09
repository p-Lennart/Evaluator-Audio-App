package com.example

import be.tarsos.dsp.AudioEvent
import be.tarsos.dsp.AudioProcessor
import be.tarsos.dsp.io.jvm.AudioDispatcherFactory
import be.tarsos.dsp.pitch.*
import kotlin.math.cos
import kotlin.math.PI

const val DEFAULT_SAMPLE_RATE = 44100f
const val DEFAULT_BUFFER_SIZE = 1024

fun getPitchDetectionAlgorithm(
    name: String,
    sampleRate: Float,
    bufferSize: Int
): PitchDetector {
    return when (name.lowercase()) {
        "amdf" -> AMDF(sampleRate, bufferSize)
        "dynamic-wavelet", "dynamicwavelet" -> DynamicWavelet(sampleRate, bufferSize)
        "fast-yin", "fastyin" -> FastYin(sampleRate, bufferSize)
        "mcleod", "mcleodpitchmethod" -> McLeodPitchMethod(sampleRate, bufferSize)
        "yin" -> Yin(sampleRate, bufferSize)
        else -> throw IllegalArgumentException("Unknown pitch detection algorithm: $name")
    }
}

/** Apply an in-place Hann window to the buffer */
fun applyHannWindow(buffer: FloatArray) {
    val n = buffer.size
    if (n <= 1) return
    // Hann: w[n] = 0.5 * (1 - cos(2π n / (N - 1)))
    for (i in 0 until n) {
        val w = 0.5f * (1.0f - cos(2.0 * PI * i / (n - 1)).toFloat())
        buffer[i] = buffer[i] * w
    }
}

fun main(args: Array<String>) {
    if (args.size < 2) {
        println("Usage: <algorithm> <path-to-audio> [bufferSize] [overlap]")
        println("Example: yin myfile.wav 1024 0")
        return
    }

    val algorithmName = args[0]
    val path = args[1]
    val bufferSize = if (args.size >= 3) args[2].toInt() else DEFAULT_BUFFER_SIZE
    val overlap = if (args.size >= 4) args[3].toInt() else 0

    // Create a dispatcher that reads from file (will use file's sample rate)
    val file = java.io.File(path)
    if (!file.exists()) {
        System.err.println("File not found: $path")
        return
    }

    val dispatcher = AudioDispatcherFactory.fromFile(file, bufferSize, overlap)
    val srcRate = dispatcher.format.sampleRate.toFloat()

    // Construct a pitch detector configured with the *source* sample rate and bufferSize.
    // It's important the detector's expected frame size matches the frames we pass in.
    val pitchDetector: PitchDetector = getPitchDetectionAlgorithm(algorithmName, srcRate, bufferSize)

    // Running sample counter (in samples of the source rate)
    var samplesSeen: Long = 0L
    val hop = bufferSize - overlap

    dispatcher.addAudioProcessor(object : AudioProcessor {
        override fun process(audioEvent: AudioEvent): Boolean {
            // audioEvent.floatBuffer length should equal bufferSize
            val frame = audioEvent.floatBuffer
            if (frame.size != bufferSize) {
                // This shouldn't happen with fromFile(..., bufferSize, overlap),
                // but guard just in case.
                // If it's different, we can either skip or create a new buffer padded/truncated.
                // Here we skip processing inconsistent frames.
                samplesSeen += hop
                return true
            }

            // Make a copy if you want to keep original buffer intact elsewhere.
            // But modifying in-place is fine if no other processor relies on untouched data.
            val windowed = frame.copyOf()
            applyHannWindow(windowed)

            // Ask the pitch detector for a pitch
            val detection = pitchDetector.getPitch(windowed)
            val pitchHz = detection.pitch  // -1.0 when unvoiced / undefined

            // Use audioEvent.timeStamp for accurate time in seconds (float precision)
            val timeSec = audioEvent.timeStamp

            // Print time and pitch
            println("${"%.6f".format(timeSec)}\t${"%.6f".format(pitchHz)}")

            // advance running counter
            samplesSeen += hop
            return true
        }

        override fun processingFinished() {
            // nothing special to do
        }
    })

    // Run the dispatcher (blocks until EOF)
    dispatcher.run()
}

