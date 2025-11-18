package com.ni121.companionapp

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.Arguments
import be.tarsos.dsp.util.fft.FFT
import be.tarsos.dsp.util.fft.HannWindow
import kotlin.FloatArray
import kotlin.Array
import kotlin.Float

class FFTModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    var cFC: Array<FloatArray> = emptyArray()

    override fun getName() = "FFTModule"

    @ReactMethod
    fun setcFC(cFC: ReadableArray, promise: Promise) {
        try {
            this.cFC = Array(cFC.size()) { FloatArray(cFC.getArray(0)!!.size()) }

            for (i in 0..(cFC.size() - 1)) {
                for (j in 0..(cFC.getArray(0)!!.size() - 1)) {
                    this.cFC[i][j] = cFC.getArray(i)!!.getDouble(j).toFloat();
                }
            }

            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("Error setting cFC", e)
        }
    }

    @ReactMethod
    fun fft(signalDataIn: ReadableArray, promise: Promise) {
        try {
            val fftLib = FFT(signalDataIn.size(), HannWindow())

            val signalData = FloatArray(signalDataIn.size())
            for (i in signalData.indices) {
                signalData[i] = signalDataIn.getDouble(i).toFloat()
            }

            fftLib.forwardTransform(signalData)

            val amplitudes = FloatArray(signalData.size / 2)
            fftLib.modulus(signalData, amplitudes)

            val chromaVec = FloatArray(12)
            for (i in 0..11) {
                var sum = 0f

                for (j in 0..(amplitudes.size - 1)) {
                    sum += this.cFC[i][j] * amplitudes[j] * amplitudes[j]
                }

                chromaVec[i] = sum
            }

            val result = Arguments.fromArray(chromaVec)

            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("FFT_ERROR", e)
        }
    }

    @ReactMethod
    fun dot(vec1: ReadableArray, vec2: ReadableArray, promise: Promise) {
        try {
            assert(vec1.size() == vec2.size())

            var sum = 0.0

            for (i in 0..(vec1.size() - 1)) {
                sum += vec1.getDouble(i) * vec2.getDouble(i)
            }

            promise.resolve(sum)
        } catch (e: Exception) {
            promise.reject("DOT_ERROR", e)
        }
    }
}
