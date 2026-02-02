package com.ni121.companionapp

import android.media.AudioFormat
import android.media.AudioRecord
import android.media.MediaRecorder
import android.os.Handler
import android.os.Looper
import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import be.tarsos.dsp.pitch.FastYin
import java.util.concurrent.atomic.AtomicBoolean
import java.net.URL
import java.io.ByteArrayOutputStream
import java.nio.ByteBuffer
import java.nio.ByteOrder

class AudioPerformanceModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    
    companion object {
        private const val TAG = "AudioPerformanceModule"
    }
    
    private val SAMPLE_RATE = 44100
    private val PROCESSING_BUFFER_SIZE = 4096

    private val MIN_BUFFER_SIZE = AudioRecord.getMinBufferSize(
        SAMPLE_RATE,
        AudioFormat.CHANNEL_IN_MONO,
        AudioFormat.ENCODING_PCM_16BIT
    )

    private var audioRecord: AudioRecord? = null
    private val isRecording = AtomicBoolean(false)
    private var recordingThread: Thread? = null
    
    // Handler for posting events to main thread
    private val mainHandler = Handler(Looper.getMainLooper())
    
    // CENS feature extractor
    private var censUtils: CENSUtils? = null
    
    // DTW state
    private var refFeaturegram: Array<DoubleArray> = emptyArray()
    private var refLen: Int = 0
    private var liveFeaturegram: MutableList<DoubleArray> = mutableListOf()
    private var accumulatedCost: Array<DoubleArray> = emptyArray()
    private var winSize: Int = 50
    private var maxRunCount: Int = 3
    private var diagWeight: Double = 0.75
    private var refIdx: Int = 0
    private var liveIdx: Int = -1
    private var prevStep: String = "---"
    private var runCount: Int = 1
    private var lastRefIdx: Int = 0
    private var dtwInitialized: Boolean = false

    override fun getName() = "AudioPerformanceModule"

    @ReactMethod
    fun addListener(eventName: String) {
        // Required for NativeEventEmitter
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        // Required for NativeEventEmitter
    }

    /**
     * Initialize DTW by loading audio from a URL and computing CENS natively.
     * This avoids sending 1.2M samples over the React Native bridge.
     * @param audioUrl URL to the WAV audio file
     * @param bigC Window size for DTW
     * @param maxRun Maximum run count for slope constraint
     * @param diagW Diagonal weight
     */
    @ReactMethod
    fun initializeDTWFromUrl(audioUrl: String, bigC: Int, maxRun: Int, diagW: Double, promise: Promise) {
        // Run on background thread to avoid blocking UI
        Thread {
            try {
                Log.d(TAG, "initializeDTWFromUrl: downloading from $audioUrl")
                
                // Download audio file
                val url = URL(audioUrl)
                val connection = url.openConnection()
                connection.connectTimeout = 10000
                connection.readTimeout = 30000
                val inputStream = connection.getInputStream()
                val outputStream = ByteArrayOutputStream()
                val buffer = ByteArray(8192)
                var bytesRead: Int
                while (inputStream.read(buffer).also { bytesRead = it } != -1) {
                    outputStream.write(buffer, 0, bytesRead)
                }
                inputStream.close()
                val wavBytes = outputStream.toByteArray()
                Log.d(TAG, "Downloaded ${wavBytes.size} bytes")
                
                // Parse WAV header and extract audio samples
                val audioSamples = parseWavFile(wavBytes)
                Log.d(TAG, "Parsed ${audioSamples.size} audio samples")
                
                // Initialize CENS utils
                val cens = CENSUtils(SAMPLE_RATE, PROCESSING_BUFFER_SIZE)
                censUtils = cens
                
                // Compute number of frames
                val numSamples = audioSamples.size
                val numFrames = numSamples / PROCESSING_BUFFER_SIZE
                Log.d(TAG, "Computing $numFrames CENS frames from audio")
                
                // Compute CENS features for each frame
                refFeaturegram = Array(numFrames) { frameIdx ->
                    val frameStart = frameIdx * PROCESSING_BUFFER_SIZE
                    val frame = FloatArray(PROCESSING_BUFFER_SIZE) { i ->
                        if (frameStart + i < audioSamples.size) audioSamples[frameStart + i] else 0f
                    }
                    cens.computeCENS(frame)
                }
                refLen = numFrames
                
                Log.d(TAG, "Computed $refLen reference CENS features")
                
                // Initialize accumulated cost matrix with Infinity
                val matrixWidth = refLen * 4
                accumulatedCost = Array(refLen) { DoubleArray(matrixWidth) { Double.POSITIVE_INFINITY } }
                
                // Set parameters
                winSize = bigC
                maxRunCount = maxRun
                diagWeight = diagW
                
                // Reset state
                refIdx = 0
                liveIdx = -1
                prevStep = "---"
                runCount = 1
                lastRefIdx = 0
                liveFeaturegram.clear()
                
                dtwInitialized = true
                
                Log.d(TAG, "DTW initialized with refLen=$refLen, winSize=$winSize, maxRunCount=$maxRunCount")
                
                // Resolve on main thread
                mainHandler.post {
                    promise.resolve(true)
                }
            } catch (e: Exception) {
                Log.e(TAG, "Error initializing DTW from URL: ${e.message}")
                e.printStackTrace()
                mainHandler.post {
                    promise.reject("DTW_INIT_ERROR", e.message ?: "Unknown error")
                }
            }
        }.start()
    }

    /**
     * Parse a WAV file and return mono audio samples as float array.
     * Supports 16-bit PCM WAV files.
     */
    private fun parseWavFile(wavBytes: ByteArray): FloatArray {
        val buffer = ByteBuffer.wrap(wavBytes).order(ByteOrder.LITTLE_ENDIAN)
        
        // Read RIFF header
        val riff = ByteArray(4)
        buffer.get(riff)
        if (String(riff) != "RIFF") {
            throw IllegalArgumentException("Not a valid WAV file: missing RIFF header")
        }
        
        buffer.getInt() // file size
        
        val wave = ByteArray(4)
        buffer.get(wave)
        if (String(wave) != "WAVE") {
            throw IllegalArgumentException("Not a valid WAV file: missing WAVE header")
        }
        
        // Find fmt chunk
        var numChannels = 0
        var sampleRate = 0
        var bitsPerSample = 0
        
        while (buffer.hasRemaining()) {
            val chunkId = ByteArray(4)
            buffer.get(chunkId)
            val chunkSize = buffer.getInt()
            val chunkIdStr = String(chunkId)
            
            when (chunkIdStr) {
                "fmt " -> {
                    val audioFormat = buffer.getShort().toInt()
                    numChannels = buffer.getShort().toInt()
                    sampleRate = buffer.getInt()
                    buffer.getInt() // byte rate
                    buffer.getShort() // block align
                    bitsPerSample = buffer.getShort().toInt()
                    
                    // Skip any extra format bytes
                    val extraBytes = chunkSize - 16
                    if (extraBytes > 0) {
                        buffer.position(buffer.position() + extraBytes)
                    }
                    
                    Log.d(TAG, "WAV format: channels=$numChannels, sampleRate=$sampleRate, bits=$bitsPerSample")
                    
                    if (audioFormat != 1) {
                        throw IllegalArgumentException("Only PCM WAV files are supported (got format $audioFormat)")
                    }
                }
                "data" -> {
                    // Read audio data
                    val numSamples = chunkSize / (bitsPerSample / 8) / numChannels
                    Log.d(TAG, "Reading $numSamples samples")
                    
                    val samples = FloatArray(numSamples)
                    
                    if (bitsPerSample == 16) {
                        for (i in 0 until numSamples) {
                            var sum = 0f
                            for (ch in 0 until numChannels) {
                                sum += buffer.getShort().toFloat()
                            }
                            // Convert to mono by averaging channels
                            samples[i] = sum / numChannels
                        }
                    } else if (bitsPerSample == 24) {
                        for (i in 0 until numSamples) {
                            var sum = 0f
                            for (ch in 0 until numChannels) {
                                val b1 = buffer.get().toInt() and 0xFF
                                val b2 = buffer.get().toInt() and 0xFF
                                val b3 = buffer.get().toInt()
                                val sample = (b3 shl 16) or (b2 shl 8) or b1
                                sum += sample.toFloat()
                            }
                            samples[i] = sum / numChannels
                        }
                    } else {
                        throw IllegalArgumentException("Unsupported bit depth: $bitsPerSample")
                    }
                    
                    return samples
                }
                else -> {
                    // Skip unknown chunk
                    buffer.position(buffer.position() + chunkSize)
                }
            }
        }
        
        throw IllegalArgumentException("No data chunk found in WAV file")
    }

    /**
     * Initialize DTW with reference audio data.
     * Computes CENS features natively from raw audio samples.
     * @param audioSamples Raw audio samples as array of doubles
     * @param bigC Window size for DTW
     * @param maxRun Maximum run count for slope constraint
     * @param diagW Diagonal weight
     */
    @ReactMethod
    fun initializeDTWFromAudio(audioSamples: ReadableArray, bigC: Int, maxRun: Int, diagW: Double, promise: Promise) {
        try {
            Log.d(TAG, "initializeDTWFromAudio: received ${audioSamples.size()} samples")
            
            // Initialize CENS utils
            val cens = CENSUtils(SAMPLE_RATE, PROCESSING_BUFFER_SIZE)
            censUtils = cens
            
            // Compute number of frames
            val numSamples = audioSamples.size()
            val numFrames = numSamples / PROCESSING_BUFFER_SIZE
            Log.d(TAG, "Computing $numFrames CENS frames from audio")
            
            // Compute CENS features for each frame
            refFeaturegram = Array(numFrames) { frameIdx ->
                val frameStart = frameIdx * PROCESSING_BUFFER_SIZE
                val frame = FloatArray(PROCESSING_BUFFER_SIZE) { i ->
                    audioSamples.getDouble(frameStart + i).toFloat()
                }
                cens.computeCENS(frame)
            }
            refLen = numFrames
            
            Log.d(TAG, "Computed $refLen reference CENS features")
            
            // Initialize accumulated cost matrix with Infinity
            val matrixWidth = refLen * 4
            accumulatedCost = Array(refLen) { DoubleArray(matrixWidth) { Double.POSITIVE_INFINITY } }
            
            // Set parameters
            winSize = bigC
            maxRunCount = maxRun
            diagWeight = diagW
            
            // Reset state
            refIdx = 0
            liveIdx = -1
            prevStep = "---"
            runCount = 1
            lastRefIdx = 0
            liveFeaturegram.clear()
            
            dtwInitialized = true
            
            Log.d(TAG, "DTW initialized with refLen=$refLen, winSize=$winSize, maxRunCount=$maxRunCount")
            promise.resolve(true)
        } catch (e: Exception) {
            Log.e(TAG, "Error initializing DTW from audio: ${e.message}")
            e.printStackTrace()
            promise.reject("DTW_INIT_ERROR", e)
        }
    }

    /**
     * Initialize DTW with reference features.
     * Must be called before startProcessing() for DTW-based score following.
     * @param refFeatures 2D array of reference CENS features (each row is a 12-dim chroma vector)
     * @param bigC Window size for DTW
     * @param maxRun Maximum run count for slope constraint
     * @param diagW Diagonal weight
     */
    @ReactMethod
    fun initializeDTW(refFeatures: ReadableArray, bigC: Int, maxRun: Int, diagW: Double, promise: Promise) {
        try {
            // Parse reference featuregram
            refLen = refFeatures.size()
            refFeaturegram = Array(refLen) { i ->
                val chromaArr = refFeatures.getArray(i)!!
                DoubleArray(chromaArr.size()) { j -> chromaArr.getDouble(j) }
            }
            
            // Initialize accumulated cost matrix with Infinity
            val matrixWidth = refLen * 4
            accumulatedCost = Array(refLen) { DoubleArray(matrixWidth) { Double.POSITIVE_INFINITY } }
            
            // Set parameters
            winSize = bigC
            maxRunCount = maxRun
            diagWeight = diagW
            
            // Reset state
            refIdx = 0
            liveIdx = -1
            prevStep = "---"
            runCount = 1
            lastRefIdx = 0
            liveFeaturegram.clear()
            
            // Initialize CENS utils
            censUtils = CENSUtils(SAMPLE_RATE, PROCESSING_BUFFER_SIZE)
            
            dtwInitialized = true
            
            Log.d(TAG, "DTW initialized with refLen=$refLen, winSize=$winSize, maxRunCount=$maxRunCount")
            promise.resolve(true)
        } catch (e: Exception) {
            Log.e(TAG, "Error initializing DTW: ${e.message}")
            promise.reject("DTW_INIT_ERROR", e)
        }
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
            
            // Reset DTW state for new performance
            if (dtwInitialized) {
                resetDTWState()
            }

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
            recordingThread?.join()
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("STOP_ERROR", e)
        }
    }

    private var lastEventTime: Long = 0
    
    // Silence detection threshold (RMS energy) - higher value requires louder sound
    private val SILENCE_THRESHOLD = 1500f  // Increased to filter soft background noise

    private fun processAudioStream() {
        val buffer = ShortArray(PROCESSING_BUFFER_SIZE)
        val floatBuffer = FloatArray(PROCESSING_BUFFER_SIZE)
        val fastYin = FastYin(SAMPLE_RATE.toFloat(), PROCESSING_BUFFER_SIZE)

        Log.d(TAG, "Processing thread started, DTW initialized: $dtwInitialized")

        while (isRecording.get()) {
            val readResult = audioRecord?.read(buffer, 0, PROCESSING_BUFFER_SIZE) ?: 0

            if (readResult > 0) {
                // Convert to float and compute RMS energy
                var sumSquares = 0.0
                for (i in 0 until readResult) {
                    floatBuffer[i] = buffer[i].toFloat()
                    sumSquares += floatBuffer[i] * floatBuffer[i]
                }
                val rmsEnergy = kotlin.math.sqrt(sumSquares / readResult).toFloat()

                // Pitch detection
                val detectionResult = fastYin.getPitch(floatBuffer)
                val pitch = detectionResult.pitch
                val probability = detectionResult.probability

                // DTW step (if initialized) - only if audio is not silence
                var refPosition = -1
                if (dtwInitialized && censUtils != null) {
                    // Skip DTW if audio is too quiet (silence)
                    if (rmsEnergy >= SILENCE_THRESHOLD) {
                        try {
                            refPosition = dtwStep(floatBuffer)
                        } catch (e: Exception) {
                            Log.e(TAG, "DTW step error: ${e.message}")
                        }
                    } else {
                        // Return last known position during silence
                        refPosition = lastRefIdx
                    }
                }

                // Throttle events to ~20 per second
                val currentTime = System.currentTimeMillis()
                if (currentTime - lastEventTime > 50) {
                    sendFrameEvent(refPosition, pitch.toDouble(), probability.toDouble())
                    lastEventTime = currentTime
                }
            } else {
                Log.w(TAG, "AudioRecord read returned error or 0: $readResult")
            }
        }
        Log.d(TAG, "Processing thread stopped")
    }

    /**
     * Perform one DTW step with the given audio frame.
     * @return Current position in reference sequence, or -1 on error
     */
    private fun dtwStep(audioFrame: FloatArray): Int {
        // Safety check
        val cens = censUtils ?: return -1
        if (refFeaturegram.isEmpty() || refLen == 0) return -1
        
        // Compute CENS features from audio frame
        val chromaVec = cens.computeCENS(audioFrame)
        liveFeaturegram.add(chromaVec)
        liveIdx += 1
        
        // Check if liveIdx exceeds matrix width
        if (liveIdx >= accumulatedCost[0].size) {
            Log.w(TAG, "Live index $liveIdx exceeds matrix width, returning last position")
            return lastRefIdx
        }
        
        // Update accumulated cost for current window
        val startK = maxOf(0, refIdx - winSize + 1)
        for (k in startK..minOf(refIdx, refLen - 1)) {
            updateAccumulatedCost(k, liveIdx)
        }
        
        // Path finding loop with safety limit
        var iterations = 0
        val maxIterations = refLen // Prevent infinite loops
        while (iterations < maxIterations) {
            iterations++
            val (step, _, _) = getBestStep()
            
            if (step == "live") break
            
            refIdx = minOf(refIdx + 1, refLen - 1)
            
            // Update accumulated cost for the new refIdx
            val startL = maxOf(liveIdx - winSize + 1, 0)
            for (l in startL..liveIdx) {
                updateAccumulatedCost(refIdx, l)
            }
            
            if (step == "both") break
        }
        
        // Get current ref position (don't go backwards)
        var currentRefPosition = refIdx
        if (currentRefPosition < lastRefIdx) {
            currentRefPosition = lastRefIdx
        }
        lastRefIdx = currentRefPosition
        
        return currentRefPosition
    }

    private fun dot(vec1: DoubleArray, vec2: DoubleArray): Double {
        var sum = 0.0
        for (i in vec1.indices) {
            sum += vec1[i] * vec2[i]
        }
        return sum
    }

    private fun argmin(arr: DoubleArray, length: Int): Int {
        var minIdx = 0
        var minVal = arr[0]
        for (i in 1 until length) {
            if (arr[i] < minVal) {
                minVal = arr[i]
                minIdx = i
            }
        }
        return minIdx
    }

    private fun updateAccumulatedCost(refIndex: Int, liveIndex: Int) {
        if (liveIndex >= accumulatedCost[0].size) {
            Log.w(TAG, "Live index $liveIndex exceeds matrix width")
            return
        }
        
        val refVec = refFeaturegram[refIndex]
        val liveVec = liveFeaturegram[liveIndex]
        val cost = 1.0 - dot(refVec, liveVec)
        
        if (refIndex == 0 && liveIndex == 0) {
            accumulatedCost[refIndex][liveIndex] = cost
            return
        }
        
        val steps = mutableListOf<Double>()
        
        if (refIndex > 0 && liveIndex > 0) {
            steps.add(accumulatedCost[refIndex - 1][liveIndex - 1] + diagWeight * cost)
        }
        if (refIndex > 0) {
            steps.add(accumulatedCost[refIndex - 1][liveIndex] + cost)
        }
        if (liveIndex > 0) {
            steps.add(accumulatedCost[refIndex][liveIndex - 1] + cost)
        }
        
        accumulatedCost[refIndex][liveIndex] = steps.minOrNull() ?: cost
    }

    private fun getBestStep(): Triple<String, Int, Int> {
        // Safety bounds checks
        if (liveIdx < 0 || refIdx < 0 || refIdx >= refLen) {
            return Triple("live", refIdx, liveIdx)
        }
        if (liveIdx >= accumulatedCost[0].size) {
            return Triple("live", refIdx, liveIdx)
        }
        
        val rowCosts = DoubleArray(liveIdx + 1) { i -> 
            if (i < accumulatedCost[refIdx].size) accumulatedCost[refIdx][i] else Double.POSITIVE_INFINITY
        }
        val colCosts = DoubleArray(refIdx + 1) { i -> 
            if (liveIdx < accumulatedCost[i].size) accumulatedCost[i][liveIdx] else Double.POSITIVE_INFINITY
        }
        
        var bestT = argmin(rowCosts, rowCosts.size)
        var bestJ = argmin(colCosts, colCosts.size)
        var step: String
        
        if (accumulatedCost[bestJ][liveIdx] < accumulatedCost[refIdx][bestT]) {
            bestT = liveIdx
            step = "live"
        } else if (accumulatedCost[bestJ][liveIdx] > accumulatedCost[refIdx][bestT]) {
            bestJ = refIdx
            step = "ref"
        } else {
            bestT = liveIdx
            bestJ = refIdx
            step = "both"
        }
        
        if (bestT == liveIdx && bestJ == refIdx) step = "both"
        if (liveIdx < winSize) step = "both"
        if (runCount >= maxRunCount) {
            step = if (prevStep == "ref") "live" else "ref"
        }
        
        if (step == "both" || prevStep != step) {
            runCount = 1
        } else {
            runCount += 1
        }
        
        prevStep = step
        
        if (refIdx == refLen - 1) step = "live"
        
        return Triple(step, bestJ, bestT)
    }

    private fun resetDTWState() {
        for (i in accumulatedCost.indices) {
            for (j in accumulatedCost[i].indices) {
                accumulatedCost[i][j] = Double.POSITIVE_INFINITY
            }
        }
        refIdx = 0
        liveIdx = -1
        prevStep = "---"
        runCount = 1
        lastRefIdx = 0
        liveFeaturegram.clear()
    }

    private fun sendFrameEvent(refPosition: Int, pitch: Double, probability: Double) {
        // Post to main thread to ensure thread safety with React Native bridge
        mainHandler.post {
            try {
                if (reactApplicationContext.hasActiveCatalystInstance()) {
                    val params = Arguments.createMap().apply {
                        putInt("refPosition", refPosition)  // DTW-aligned position in reference (-1 if not initialized)
                        putDouble("pitch", pitch)
                        putDouble("probability", probability)
                    }
                    reactApplicationContext
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        ?.emit("onAudioFrame", params)
                }
            } catch (e: Exception) {
                Log.e(TAG, "Error sending frame event: ${e.message}")
            }
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
