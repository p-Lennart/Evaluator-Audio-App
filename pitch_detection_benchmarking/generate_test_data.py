import numpy as np
from scipy.io import wavfile
import os
import itertools

# --- Signal Generation Functions ---

def _generate_linear_chirp(t, start_freq, end_freq, **kwargs):
    """Generates a linear chirp signal and its ground truth frequency."""
    instantaneous_freq = np.linspace(start_freq, end_freq, len(t))
    phase = 2 * np.pi * np.cumsum(instantaneous_freq) / kwargs['fs']
    signal = 0.5 * np.sin(phase)
    return signal, instantaneous_freq

def _generate_fixed_sine(t, freq, **kwargs):
    """Generates a fixed sine wave and its ground truth frequency."""
    instantaneous_freq = np.full_like(t, freq)
    phase = 2 * np.pi * freq * t
    signal = 0.5 * np.sin(phase)
    return signal, instantaneous_freq

def _generate_vibrato_sine(t, base_freq, vibrato_rate, vibrato_depth, **kwargs):
    """Generates a sine wave with vibrato and its ground truth frequency."""
    vibrato = vibrato_depth * np.sin(2 * np.pi * vibrato_rate * t)
    instantaneous_freq = base_freq + vibrato
    phase = 2 * np.pi * np.cumsum(instantaneous_freq) / kwargs['fs']
    signal = 0.5 * np.sin(phase)
    return signal, instantaneous_freq

def _generate_harmonic_signal(t, freq, n_harmonics=4, **kwargs):
    """Generates a signal with a fundamental frequency and several harmonics."""
    signal = np.zeros_like(t)
    for i in range(1, n_harmonics + 1):
        amplitude = 1 / (i * 2) # Decrease amplitude for higher harmonics
        phase = 2 * np.pi * freq * i * t
        signal += amplitude * np.sin(phase)
    instantaneous_freq = np.full_like(t, freq)
    return signal, instantaneous_freq

def _add_noise(signal, instantaneous_freq, noise_level=0.1):
    """Adds white noise to a signal."""
    noise = np.random.normal(0, noise_level, len(signal))
    return signal + noise, instantaneous_freq

def _add_silences(signal, instantaneous_freq, silence_duration=0.5, silence_period=1.5):
    """Adds periodic silences to a signal."""
    t = np.linspace(0, len(signal) / 44100, len(signal))
    mask = (t % silence_period) < (silence_period - silence_duration)
    signal *= mask
    instantaneous_freq *= mask # Freq is 0 during silence
    return signal, instantaneous_freq


# --- Main Generation Logic ---

def generate_synthetic_audio(
    output_dir,
    filename_base,
    signal_generator,
    duration=5.0,
    fs=44100,
    annotation_hop=0.01,
    post_modifiers=None,
    **sig_params
):
    """
    Generates and saves a synthetic audio file and its pitch annotation.
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    t_audio = np.linspace(0., duration, int(fs * duration))
    sig_params['fs'] = fs
    audio_signal, instantaneous_freq = signal_generator(t_audio, **sig_params)

    # Apply any post-processing modifiers (like noise or silences)
    if post_modifiers:
        for modifier, params in post_modifiers:
            audio_signal, instantaneous_freq = modifier(audio_signal, instantaneous_freq, **params)
    
    # Normalize to 16-bit integer, being careful of clipping
    max_abs = np.max(np.abs(audio_signal))
    if max_abs > 0:
        audio_signal /= max_abs
    audio_signal_int = (audio_signal * 32767).astype(np.int16)

    wav_path = os.path.join(output_dir, f"{filename_base}.wav")
    wavfile.write(wav_path, fs, audio_signal_int)
    print(f"Generated audio file: {wav_path}")

    t_annot = np.arange(0, duration, annotation_hop)
    annotation_freqs = np.interp(t_annot, t_audio, instantaneous_freq)

    annotation_path = os.path.join(output_dir, f"{filename_base}_ground_truth.txt")
    with open(annotation_path, 'w') as f:
        for time, freq in zip(t_annot, annotation_freqs):
            f.write(f"{time:.3f}\t{freq:.3f}\n")
    print(f"Generated annotation file: {annotation_path}")


def generate_test_suite():
    """
    Generates a full suite of test audio files.
    """
    suite_dir = os.path.join('data', 'test_suite')
    
    test_cases = [
        {
            "filename_base": "01_linear_chirp",
            "signal_generator": _generate_linear_chirp,
            "sig_params": {"start_freq": 220.0, "end_freq": 880.0}
        },
        {
            "filename_base": "02_fixed_sine",
            "signal_generator": _generate_fixed_sine,
            "sig_params": {"freq": 440.0}
        },
        {
            "filename_base": "03_vibrato_sine",
            "signal_generator": _generate_vibrato_sine,
            "sig_params": {"base_freq": 440.0, "vibrato_rate": 5.0, "vibrato_depth": 20.0}
        },
        {
            "filename_base": "04_harmonic_signal",
            "signal_generator": _generate_harmonic_signal,
            "sig_params": {"freq": 261.63, "n_harmonics": 5} # C4
        },
        {
            "filename_base": "05_noisy_chirp",
            "signal_generator": _generate_linear_chirp,
            "sig_params": {"start_freq": 220.0, "end_freq": 880.0},
            "post_modifiers": [(_add_noise, {"noise_level": 0.2})]
        },
        {
            "filename_base": "06_chirp_with_silences",
            "signal_generator": _generate_linear_chirp,
            "sig_params": {"start_freq": 220.0, "end_freq": 880.0},
            "post_modifiers": [(_add_silences, {"silence_duration": 0.4, "silence_period": 1.0})]
        }
    ]

    for case in test_cases:
        print(f"--- Generating: {case['filename_base']} ---")
        generate_synthetic_audio(
            output_dir=suite_dir,
            filename_base=case['filename_base'],
            signal_generator=case['signal_generator'],
            post_modifiers=case.get('post_modifiers'),
            **case.get('sig_params', {})
        )
        print("-" * (len(case['filename_base']) + 16))


if __name__ == '__main__':
    generate_test_suite()
