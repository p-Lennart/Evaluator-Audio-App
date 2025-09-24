import re
import sys
from statistics import mean, median

def parse_cursor_logs(file_path):
    try:
        with open(file_path, 'r') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"File not found: {file_path}")
        return

    # Parse logs
    timing_pattern = r'Dispatch Timing: Audio=([\d.]+)s, Predicted=([\d.]+)s, Diff=([-\d.]+)s, Beat=([\d.]+)'
    timing_logs = re.findall(timing_pattern, content)
    dispatch_pattern = r'Cursor Dispatch: Beat ([\d.]+) dispatched with ([\d.]+)ms delay'
    dispatches = re.findall(dispatch_pattern, content)
    
    print("="*60)
    print(f"Timing Analysis Entries: {len(timing_logs)}")
    print(f"Actual Cursor Dispatches: {len(dispatches)}")
    
    if not dispatches:
        print("No cursor dispatches found!")
        return
    
    # Analyze dispatch delays
    delays = [float(delay) for beat, delay in dispatches]
    
    print(f"\nCursor dispatch performance:")
    print(f"Best Response Time: {min(delays):.1f}ms")
    print(f"Average Delay: {mean(delays):.1f}ms")
    print(f"Median Delay: {median(delays):.1f}ms")
    print(f"Worst Delay: {max(delays):.1f}ms")

    # Categorize performance
    excellent = sum(1 for d in delays if d < 50)
    good = sum(1 for d in delays if 50 <= d < 100)
    poor = sum(1 for d in delays if d >= 100)
    
    print(f"\nPerformance Breakdown:")
    print(f"(<50ms): {excellent}/{len(delays)} ({excellent/len(delays)*100:.1f}%)")
    print(f"(50-100ms): {good}/{len(delays)} ({good/len(delays)*100:.1f}%)")
    print(f"(>100ms): {poor}/{len(delays)} ({poor/len(delays)*100:.1f}%)")
    
    # Show timing differences if available
    if timing_logs:
        diffs = [float(diff) * 1000 for audio, predicted, diff, beat in timing_logs]  # Convert to ms
        print(f"\nAudio vs Predicted Timing:")
        print(f"Average Difference: {mean(diffs):.1f}ms")
        print(f"Median Difference: {median(diffs):.1f}ms")
        
        sync_good = sum(1 for d in diffs if abs(d) < 20)
        print(f"Well-Synchronized (<20ms): {sync_good}/{len(diffs)} ({sync_good/len(diffs)*100:.1f}%)")
    
    # Show sample dispatches for presentation
    print(f"\nSample dispatches:")
    sample_size = min(10, len(dispatches))
    for i, (beat, delay) in enumerate(dispatches[:sample_size]):
        print(f"Beat {beat}: {delay}ms delay")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 task_analysis_parser.py console_logs.txt")
        sys.exit(1)
    
    parse_cursor_logs(sys.argv[1])