import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";
import { RecordingOptions } from "expo-av/build/Audio";
import { Platform } from "react-native";

/**
 * Continuously captures microphone audio in fixed-size chunks and converts
 * them into raw `Float32Array` PCM frames. When a full buffer of 4096 samples
 * has been accumulated, the processor emits a message via {@link onmessage}.
 *
 * This class uses Expo's `expo-av` recording API. Audio capture occurs by
 * repeatedly starting a short recording, stopping it after the calculated
 * duration, decoding the audio, and feeding the samples into an internal
 * circular buffer.
 *
 * @remarks
 * - iOS receives uncompressed 32-bit float PCM from `.wav` recordings.
 * - Android AAC decoding is not implemented yet; chunks are skipped.
 * - Call {@link init} once before {@link start}.
 */

export class ExpoMicProcessor {
  /**
   * Internal circular buffer of size 4096 samples. Once full, it triggers
   * {@link onmessage} and resets.
   */
  private _pcmBuffer = new Float32Array(4096);
  /** Current write index into the circular buffer. */
  private _writeIndex = 0;
  /** Indicates whether the capture loop is currently running. */
  private _isRunning = false;

  /**
   * Called whenever a complete 4096-sample frame is available.
   *
   * @param event.data - A copy of the accumulated Float32Array buffer.
   */
  public onmessage: (event: { data: Float32Array }) => void = () => {};

  /**
   * Requests microphone permissions and configures the global audio mode
   * needed for continuous recording. Must be invoked before {@link start}.
   *
   * @throws If the user denies microphone permissions.
   */
  public async init() {
    const { granted } = await Audio.requestPermissionsAsync(); // Prompt user for microphone permission
    if (!granted) throw new Error("Microphone permission denied"); // Error handling when microphone is not granted permission

    // Set global audio mode to allow recording
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true, // Enable recording on iOS
      playsInSilentModeIOS: true, // Allow playback even when device is silenced
      interruptionModeIOS: InterruptionModeIOS.DoNotMix, // Don't mix with other audio playing on iOS device
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix, // Don't mix with other audio on Android devices.
      shouldDuckAndroid: false, // If we didn’t get exclusive focus, don’t fall back to ducking - Android devices.
    });
  }

  /**
   * Begins the continuous recording loop. Short audio recordings are created
   * back-to-back, each long enough to contain ~4096 samples at 44.1 kHz.
   *
   * iOS recordings are decoded into Float32 PCM and accumulated into an
   * internal circular buffer. When the buffer fills, {@link onmessage} fires.
   *
   * @remarks
   * Android AAC → PCM decoding is not implemented yet. Android chunks are
   * currently skipped with a warning.
   *
   * @throws If {@link init} has not been called or audio mode is not configured.
   */
  public async start() {
    if (this._isRunning) return; // Error checking if already recording somehow before start
    this._isRunning = true; // Set recording flag to true

    const SAMPLE_RATE = 44100; // The sample rate used across platforms for predictable buffer math
    const chunkMs = (4096 / SAMPLE_RATE) * 1000; // Convert 4096 samples at SAMPLE_RATE into milliseconds

    // Recording options differ per platform (Android uses AAC, iOS uses WAV)
    // Configure platform-specific recording options:
    const recordingOptions: RecordingOptions = {
      android: {
        extension: ".m4a", // Container file extension
        outputFormat: Audio.AndroidOutputFormat.MPEG_4, // MP4/M4A file format
        audioEncoder: Audio.AndroidAudioEncoder.AAC, // AAC codec for good quality at low bitrates
        sampleRate: SAMPLE_RATE, // Samples per second (e.g., 44100 Hz)
        numberOfChannels: 1, // Mono recording
        bitRate: 128000, // Target bits per second (128 kbps)
      },
      ios: {
        extension: ".wav", // Container file extension
        outputFormat: Audio.IOSOutputFormat.LINEARPCM, // Uncompressed PCM
        sampleRate: SAMPLE_RATE, // Samples per second (e.g., 44100 Hz)
        numberOfChannels: 1, // Mono recording
        bitRate: SAMPLE_RATE * 32, // Required by type; ignored for LINEARPCM
        linearPCMBitDepth: 32, // Bits per sample (32-bit float)
        linearPCMIsBigEndian: false, // Use little-endian byte order
        linearPCMIsFloat: true, // Store samples as IEEE-754 floats
        audioQuality: Audio.IOSAudioQuality.MAX, // Use highest-quality float PCM for maximum fidelity
      },
      web: {
        mimeType: "audio/webm", // Type required by RecordingOptionsWeb
        bitsPerSecond: 128000, // Reasonable default; unused in native
      },
    };

    // Capture loop - keep recording chunks until stopped
    while (this._isRunning) {
      // Prepare recorder with our options
      const recorder = new Audio.Recording();
      await recorder.prepareToRecordAsync(recordingOptions);

      // Start recording, wait for chunk duration, then stop
      await recorder.startAsync();
      await new Promise((r) => setTimeout(r, chunkMs));
      await recorder.stopAndUnloadAsync();

      const chunkUri = recorder.getURI(); // Retrieve file URI for the recorded chunk
      if (!chunkUri) break; // if URI missing, exit loop

      // Load raw file into memory
      const arrayBuffer = await fetch(chunkUri).then((r) => r.arrayBuffer());
      let pcmSamples: Float32Array | null = null;

      // Convert file data to Float32 samples
      if (Platform.OS === "ios") {
        pcmSamples = parseWavToFloat32(arrayBuffer);
      } else {
        // Android: AAC decoding to PCM not implemented here
        console.warn("Android PCM decode not implemented; skipping chunk.");
      }

      if (pcmSamples) {
        // Push samples into our circular buffer
        for (let i = 0; i < pcmSamples.length; i++) {
          this._pcmBuffer[this._writeIndex++] = pcmSamples[i];
          // When buffer fills, fire onmessage and reset index
          if (this._writeIndex === 4096) {
            // Pass a copy of the buffer to avoid mutation
            this.onmessage({ data: this._pcmBuffer.slice(0) });
            this._writeIndex = 0;
          }
        }
      }
    }
  }

  /**
   * Stops the continuous capture loop. Does not flush partial buffers.
   */
  public stop() {
    this._isRunning = false;
  }
}

/**
 * Extracts 32-bit float PCM samples from a WAV file's "data" chunk.
 *
 * @param buf - The full WAV file in an `ArrayBuffer`.
 * @returns A `Float32Array` view of the PCM samples.
 *
 * @throws If no "data" chunk is found in the WAV.
 */
function parseWavToFloat32(buf: ArrayBuffer): Float32Array {
  const dataView = new DataView(buf); // Create a DataView to easily read binary data (bytes, integers) from the ArrayBuffer
  let chunkOffset = 12; // The first 12 bytes are the "RIFF" identifier, file size, and "WAVE" identifier

  // Loop through the subchunks until we find the "data" chunk
  while (chunkOffset < dataView.byteLength) {
    // Read the 4-character chunk ID
    const id = String.fromCharCode(
      dataView.getUint8(chunkOffset),
      dataView.getUint8(chunkOffset + 1),
      dataView.getUint8(chunkOffset + 2),
      dataView.getUint8(chunkOffset + 3)
    );

    // The next 4 bytes tell us how large this chunk’s payload is
    const size = dataView.getUint32(chunkOffset + 4, true);

    // If this is the "data" chunk, we can extract the raw PCM samples
    if (id === "data") {
      // PCM floats start immediately after the 8-byte header (ID + size)
      // size is in bytes, so divide by 4 to get the number of Float32 samples
      return new Float32Array(buf, chunkOffset + 8, size / 4);
    }

    // Otherwise skip ahead past this chunk (8 bytes header + payload)
    chunkOffset += 8 + size;
  }

  // If we never saw a "data" chunk, throw an error
  throw new Error("WAV data chunk not found");
}
