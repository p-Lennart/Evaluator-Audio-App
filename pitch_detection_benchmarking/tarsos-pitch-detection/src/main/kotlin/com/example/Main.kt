package com.example

import java.io.File
import java.nio.ByteBuffer
import java.nio.ByteOrder
import java.nio.channels.FileChannel
import java.nio.file.Path
import java.nio.file.StandardOpenOption

import be.tarsos.dsp.pitch.PitchDetector
import be.tarsos.dsp.pitch.FastYin
import be.tarsos.dsp.pitch.AMDF
import be.tarsos.dsp.pitch.DynamicWavelet
import be.tarsos.dsp.pitch.McLeodPitchMethod
import be.tarsos.dsp.pitch.Yin

import be.tarsos.dsp.AudioEvent
import be.tarsos.dsp.AudioProcessor
import be.tarsos.dsp.io.jvm.AudioDispatcherFactory
import be.tarsos.dsp.resample.RateTransposer

const val SAMPLE_RATE = 44100f
const val BUFFER_SIZE = 1024

fun getPitchDetectionAlgorithm(
    name: String,
    sampleRate: Float,
    bufferSize: Int
): PitchDetector {
    return when (name) {
        "amdf" -> AMDF(sampleRate, bufferSize)
        "dynamic-wavelet" -> DynamicWavelet(sampleRate, bufferSize)
        "fast-yin" -> FastYin(sampleRate, bufferSize)
        "mcleod" -> McLeodPitchMethod(sampleRate, bufferSize)
        "yin" -> Yin(sampleRate, bufferSize)
        else -> {
            assert(false)
            Yin(sampleRate, bufferSize)
        }
    }
}


/**
 * @param path          wav/au/aif/flac file
 * @param targetRate    sample-rate you want the returned floats to be in
 * @param bufferSize    power-of-two frame count you want each callback to see
 * @return              all samples, normalised to [-1.0f, 1.0f], mono
 */
fun wavToFloatArray(
    path: String,
    targetRate: Float,
    bufferSize: Int
): FloatArray {

    val dispatcher = AudioDispatcherFactory.fromFile(File(path), bufferSize, 0)
    val srcRate = dispatcher.format.sampleRate

    // resampler that converts incoming buffers to targetRate
    val rateChanger = RateTransposer(targetRate.toDouble() / srcRate)

    val out = mutableListOf<Float>()

    dispatcher.addAudioProcessor(object : AudioProcessor {
        override fun process(audioEvent: AudioEvent): Boolean {
            // resample in place
            rateChanger.process(audioEvent)
            // copy the now-resampled buffer
            out.addAll(audioEvent.floatBuffer.toList())
            return true
        }
        override fun processingFinished() = Unit
    })

    dispatcher.run()          // blocks until EOF
    return out.toFloatArray()
}

fun main(args: Array<String>) {
    val algorithm = args[0]
    val path = args[1]
    val pitchDetection = getPitchDetectionAlgorithm(algorithm, SAMPLE_RATE, BUFFER_SIZE)

    val audio = wavToFloatArray(path, SAMPLE_RATE, BUFFER_SIZE)

    val hop = BUFFER_SIZE     // samples between windows

    var sampleIdx = 0L        // running sample counter
    for (window in audio.asSequence().windowed(hop, hop, partialWindows = false)) {
        val timeSec = sampleIdx / SAMPLE_RATE

        val pitch = pitchDetection.getPitch(window.toFloatArray()).pitch
        println("${"%.6f".format(timeSec)}\t${"%.6f".format(pitch)}")

        sampleIdx += hop        // advance counter
    }
}

