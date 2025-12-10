from pathlib import Path
import mir_eval
import numpy as np
import os
import glob
import importlib
import pandas as pd

# --- Evaluation Function ---
def evaluate_pitch_detection(ground_truth_path, estimated_path):
    """
    Loads annotation files and returns a dictionary of pitch evaluation scores.
    """
    ref_time, ref_freq = mir_eval.io.load_time_series(ground_truth_path)
    est_time, est_freq = mir_eval.io.load_time_series(estimated_path)

    # Filter out non-positive frequencies which mir_eval treats as unvoiced
    ref_freq[ref_freq <= 0] = 0.0
    est_freq[est_freq <= 0] = 0.0
    
    scores = mir_eval.melody.evaluate(ref_time, ref_freq, est_time, est_freq)
    return scores

# --- Main Benchmark Runner ---
def run_full_benchmark(test_suite_dir='data/test_suite', output_base_dir='results'):
    """
    Runs the full pitch detection benchmark across all defined algorithms
    and test cases.
    """
    print(f"--- Running Full Benchmark on Test Suite in '{test_suite_dir}' ---")

    # Discover test cases
    audio_files = sorted(glob.glob(os.path.join(test_suite_dir, '*.wav')))
    if not audio_files:
        print(f"No .wav files found in '{test_suite_dir}'. Please run generate_test_data.py first.")
        return

    # Define algorithms to benchmark
    # To add a new algorithm:
    # 1. Create a Python file in the 'algorithms/' directory (e.g., 'my_pda.py').
    # 2. Implement a function 'run_pitch_detection(audio_path, output_path)' in it.
    # 3. Add {'name': 'MyPDA', 'module': 'algorithms.my_pda'} to this list.
    algorithms_to_benchmark = [
        {'name': 'Aubio', 'module': 'algorithms.aubio'},
        {'name': 'TarsosDSP_Yin', 'module': 'algorithms.tarsos_yin'},
        {'name': 'TarsosDSP_FastYin', 'module': 'algorithms.tarsos_fast_yin'},
        {'name': 'TarsosDSP_McLeod', 'module': 'algorithms.tarsos_mcleod'},
        {'name': 'TarsosDSP_AMDF', 'module': 'algorithms.tarsos_amdf'},
        {'name': 'TarsosDSP_DynamicWavelet', 'module': 'algorithms.tarsos_dynamic_wavelet'},
    ]

    for algo_info in algorithms_to_benchmark:
        algo_name = algo_info['name']
        algo_module_name = algo_info['module']
        print(f"\n======== Benchmarking: {algo_name} ========")
        
        try:
            algo_module = importlib.import_module(algo_module_name)
            run_algo_func = getattr(algo_module, 'run_pitch_detection')
        except (ImportError, AttributeError) as e:
            print(f"Error loading algorithm '{algo_name}' from '{algo_module_name}': {e}")
            continue

        all_scores = {}
        for audio_path in audio_files:
            filename_base = os.path.splitext(os.path.basename(audio_path))[0]
            print(f"\n--- Test Case: {filename_base} ---")

            # Create algorithm-specific output directory
            algo_output_dir = os.path.join(output_base_dir, algo_name)
            os.makedirs(algo_output_dir, exist_ok=True)
            
            ground_truth_path = os.path.join(test_suite_dir, f"{filename_base}_ground_truth.txt")
            estimated_path = os.path.join(algo_output_dir, f"{filename_base}_estimated.txt")

            # 1. Run Pitch Detection Algorithm
            success = run_algo_func(audio_path, estimated_path)
            if not success:
                print(f"Skipping evaluation for {filename_base} due to algorithm failure.")
                continue

            # 2. Evaluate the results
            print("Evaluating results...")
            try:
                scores = evaluate_pitch_detection(ground_truth_path, estimated_path)

                all_scores[Path(audio_path).name] = scores

                for key, value in scores.items():
                    print(f"{key}: {value:.3f}")
            except Exception as e:
                print(f"Error evaluating {filename_base}: {e}")
                
            print("-" * (len(filename_base) + 14))

            df = pd.DataFrame.from_dict(all_scores, orient="index")
            df.to_csv(os.path.join(algo_output_dir, 'scores.csv'), index=False)

        print(f"======== {algo_name} Benchmark Complete ========\n")


if __name__ == '__main__':
    # Ensure the results directory exists
    os.makedirs('results', exist_ok=True)
    run_full_benchmark()
