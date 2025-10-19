package com.ni121.companionapp

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.Arguments
import kotlin.FloatArray
import be.tarsos.dsp.pitch.FastYin

class PitchDetectionModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "PitchDetectionModule"

    @ReactMethod
    fun getPitch(sampleRate: Double, audioBufferIn: ReadableArray, promise: Promise) {
        try {
            val fastYin = FastYin(sampleRate.toFloat(), audioBufferIn.size())

            val audioBuffer = FloatArray(audioBufferIn.size())
            for (i in audioBuffer.indices) {
                audioBuffer[i] = audioBufferIn.getDouble(i).toFloat()
            }

            val detectionResult = fastYin.getPitch(audioBuffer)

            promise.resolve(detectionResult.pitch.toDouble())
        } catch (e: Exception) {
            promise.reject("PITCH_DETECTION_ERROR", e)
        }
    }
}
