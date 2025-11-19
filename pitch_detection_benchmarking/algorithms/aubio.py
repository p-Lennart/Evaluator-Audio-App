import subprocess

def run_pitch_detection(audio_path, output_path):
    """
    Runs the aubio pitch detection on a given audio file and saves
    the output to a text file.

    Args:
        audio_path (str): Path to the input audio file.
        output_path (str): Path to save the pitch annotation output.

    Returns:
        bool: True if successful, False otherwise.
    """
    print("Running aubio pitch detection...")
    try:
        with open(output_path, 'w') as f_out:
            # Use 'aubio pitch' command
            # Using -p yinfft is a common choice, but can be changed.
            # You can add other aubio pitch parameters here.
            command = ['aubio', 'pitch', audio_path]
            subprocess.run(command, stdout=f_out, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError) as e:
        print(f"Error running 'aubio pitch' on {audio_path}.")
        print("Please ensure 'aubio' is installed and accessible in your system's PATH.")
        print(f"Error details: {e}")
        return False
