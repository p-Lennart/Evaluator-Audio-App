package com.ni121.companionapp

import android.media.AudioFormat
import android.media.AudioRecord
import android.media.MediaRecorder
import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import be.tarsos.dsp.pitch.FastYin
import java.util.concurrent.atomic.AtomicBoolean

class AudioPerformanceModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val SAMPLE_RATE = 44100

    private val MIN_BUFFER_SIZE = AudioRecord.getMinBufferSize(
        SAMPLE_RATE,
        AudioFormat.CHANNEL_IN_MONO,
        AudioFormat.ENCODING_PCM_16BIT
    )

    private val PROCESSING_BUFFER_SIZE = 4096 
    private val RMS_GATE = 0.01
    private val YIN_PROB_GATE = 0.4
    
    private var audioRecord: AudioRecord? = null
    private val isRecording = AtomicBoolean(false)
    private var recordingThread: Thread? = null

    override fun getName() = "AudioPerformanceModule"

    @ReactMethod
    fun addListener(eventName: String) {
        // Intentionally empty method, registered for Android NativeEventEmitter to function
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        // Intentionally empty method, registered for Android NativeEventEmitter to function
    }

    @ReactMethod
    fun startProcessing(promise: Promise) {
        if (isRecording.get()) {
            promise.resolve(null)
            return
        }

        try {
            audioRecord = AudioRecord(
                MediaRecorder.AudioSource.MIC,
                SAMPLE_RATE,
                AudioFormat.CHANNEL_IN_MONO,
                AudioFormat.ENCODING_PCM_16BIT,
                Math.max(MIN_BUFFER_SIZE, PROCESSING_BUFFER_SIZE * 2)
            )

            if (audioRecord?.state != AudioRecord.STATE_INITIALIZED) {
                promise.reject("AUDIO_INIT_FAIL", "AudioRecord could not be initialized")
                return
            }

            audioRecord?.startRecording()
            isRecording.set(true)

            // Start background thread to process audio
            recordingThread = Thread {
                processAudioStream()
            }
            recordingThread?.start()

            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("START_ERROR", e)
        }
    }

    @ReactMethod
    fun stopProcessing(promise: Promise) {
        try {
            isRecording.set(false)
            audioRecord?.stop()
            audioRecord?.release()
            audioRecord = null
            recordingThread?.join() // Wait for thread to finish
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("STOP_ERROR", e)
        }
    }

    private var lastEventTime: Long = 0

    private fun processAudioStream() {
        val buffer = ShortArray(PROCESSING_BUFFER_SIZE)
        val floatBuffer = FloatArray(PROCESSING_BUFFER_SIZE)
        val fastYin = FastYin(SAMPLE_RATE.toFloat(), PROCESSING_BUFFER_SIZE)

        // Log.d("AudioPerf", "THREAD STARTED: processing loop beginning") // Checkpoint 1

        while (isRecording.get()) {
            val readResult = audioRecord?.read(buffer, 0, PROCESSING_BUFFER_SIZE) ?: 0

            if (readResult > 0) {
                // Log.d("AudioPerf", "Read bytes: $readResult") // Checkpoint 2

                for (i in 0 until readResult) {
                    floatBuffer[i] = buffer[i].toFloat()
                }

                val detectionResult = fastYin.getPitch(floatBuffer)
                val pitch = detectionResult.pitch
                val probability = detectionResult.probability

                // Checkpoint 3
                // if (pitch != -1.0f) {
                //    Log.d("AudioPerf", "Pitch: $pitch, Prob: $probability")
                // }

                val currentTime = System.currentTimeMillis()
                if (pitch > 0 && probability > YIN_PROB_GATE && (currentTime - lastEventTime > 50)) { 
                    sendEvent("onPitchDetected", pitch.toDouble())
                    lastEventTime = currentTime
                    // Log.d("AudioPerf", "EMITTED EVENT") // Checkpoint 4
                }
            } else {
                Log.w("AudioPerf", "AudioRecord read returned error or 0: $readResult")
            }
        }
        Log.d("AudioPerf", "THREAD STOPPED")
    }

    private fun sendEvent(eventName: String, data: Double) {
        if (reactApplicationContext.hasActiveCatalystInstance()) {
            reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, data)
        }
    }
    
    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        try {
            isRecording.set(false)
            audioRecord?.stop()
            audioRecord?.release()
        } catch (e: Exception) {
            // Ignore errors during shutdown
        }
    }
}