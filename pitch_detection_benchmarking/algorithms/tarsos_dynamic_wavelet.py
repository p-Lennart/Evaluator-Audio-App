import subprocess
from typing import Final

ALGORITHM: Final[str] = 'dynamic-wavelet'

def run_pitch_detection(audio_path, output_path):
    """
    Runs pitch detection on a given audio file and saves
    the output to a text file.

    Args:
        audio_path (str): Path to the input audio file.
        output_path (str): Path to save the pitch annotation output.

    Returns:
        bool: True if successful, False otherwise.
    """

    print(f"Running tarsosdsp {ALGORITHM} pitch detection...")
    try:
        with open(output_path, 'w') as f_out:
            # Use 'aubio pitch' command
            # Using -p yinfft is a common choice, but can be changed.
            # You can add other aubio pitch parameters here.
            command = ['java', '-jar', 'tarsos-pitch-detection-1.0-SNAPSHOT-jar-with-dependencies.jar', ALGORITHM, audio_path]
            subprocess.run(command, stdout=f_out, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError) as e:
        print(f"Error running tarsosdsp {ALGORITHM} on {audio_path}.")
        print(f"Error details: {e}")
        return False
