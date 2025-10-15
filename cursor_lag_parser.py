import re
import sys
from collections import defaultdict
from statistics import mean, median, stdev

class TimingAnalyzer:
    def __init__(self):
        self.dispatches = []
        self.receives = []
        self.move_starts = []
        self.renders = []
        self.finals = []
        
    def parse_dispatch(self, line):
        match = re.search(r'Beat (\d+(?:\.\d+)?), Audio time=([\d.]+)s, Predicted=([\d.]+)s, Delay=([\d.]+)ms, Timestamp=([\d.]+)ms', line)
        if match:
            return {
                'beat': float(match.group(1)),
                'audio_time': float(match.group(2)),
                'predicted_time': float(match.group(3)),
                'delay': float(match.group(4)),
                'timestamp': float(match.group(5))
            }
        return None
    
    def parse_receive(self, line):
        """Parse: [TIMING] Dispatch Received: Beat X, Receive time=Y, Dispatch lag=Z"""
        match = re.search(r'Beat (\d+(?:\.\d+)?), Receive time=([\d.]+)ms, Dispatch lag=([\d.]+|N/A)ms', line)
        if match:
            lag = match.group(3)
            return {
                'beat': float(match.group(1)),
                'receive_time': float(match.group(2)),
                'dispatch_lag': float(lag) if lag != 'N/A' else None
            }
        return None
    
    def parse_move_start(self, line):
        """Parse: [TIMING] Move Cursor Start: Beat X, Start time=Y"""
        match = re.search(r'Beat (\d+(?:\.\d+)?), Start time=([\d.]+)ms', line)
        if match:
            return {
                'beat': float(match.group(1)),
                'start_time': float(match.group(2))
            }
        return None
    
    def parse_render(self, line):
        """Parse: [TIMING] OSMD Render (STEP): Beat X, Render duration=Y"""
        match = re.search(r'OSMD Render \(STEP\): Beat ([\d.]+), Render duration=([\d.]+)ms', line)
        if match:
            return {
                'beat': float(match.group(1)),
                'duration': float(match.group(2))
            }
        return None
    
    def parse_final(self, line):
        """Parse: [TIMING] OSMD Render Complete (FINAL): Beat X, Render duration=Y, Total OSMD lag=Z"""
        match = re.search(r'Beat (\d+(?:\.\d+)?), Render duration=([\d.]+)ms, Total OSMD lag=([\d.]+|N/A)ms', line)
        if match:
            lag = match.group(3)
            return {
                'beat': float(match.group(1)),
                'render_duration': float(match.group(2)),
                'total_osmd_lag': float(lag) if lag != 'N/A' else None
            }
        return None
    
    def parse_line(self, line):
        """Parse a single log line"""
        if 'Dispatch Start:' in line:
            data = self.parse_dispatch(line)
            if data:
                self.dispatches.append(data)
        elif 'Dispatch Received:' in line:
            data = self.parse_receive(line)
            if data:
                self.receives.append(data)
        elif 'Move Cursor Start:' in line:
            data = self.parse_move_start(line)
            if data:
                self.move_starts.append(data)
        elif 'OSMD Render (STEP):' in line:
            data = self.parse_render(line)
            if data:
                self.renders.append(data)
        elif 'OSMD Render Complete (FINAL):' in line:
            data = self.parse_final(line)
            if data:
                self.finals.append(data)
    
    def analyze(self):
        """Generate analysis report"""
        print("\n" + "="*70)
        print("CURSOR LAG ANALYSIS REPORT")
        print("="*70)
        
        print(f"\n📊 Data Summary:")
        print(f"   Total dispatches: {len(self.dispatches)}")
        print(f"   Total receives: {len(self.receives)}")
        print(f"   Total move starts: {len(self.move_starts)}")
        print(f"   Total renders (steps): {len(self.renders)}")
        print(f"   Total final renders: {len(self.finals)}")
        
        # Dispatch delay analysis (should be ~0 with perfect times)
        if self.dispatches:
            delays = [d['delay'] for d in self.dispatches]
            print(f"\n⏱️  Dispatch Delay (Predicted Time Accuracy):")
            print(f"   Mean: {mean(delays):.2f}ms")
            print(f"   Median: {median(delays):.2f}ms")
            print(f"   Min: {min(delays):.2f}ms")
            print(f"   Max: {max(delays):.2f}ms")
            if len(delays) > 1:
                print(f"   Std Dev: {stdev(delays):.2f}ms")
            
            if max(delays) > 1.0:
                print(f"   ⚠️  WARNING: Dispatch delay > 1ms detected!")
                print(f"       This suggests predicted times are not perfectly aligned with audio times.")
        
        # Dispatch lag analysis (React propagation time)
        dispatch_lags = [r['dispatch_lag'] for r in self.receives if r['dispatch_lag'] is not None]
        if dispatch_lags:
            print(f"\n🔄 Dispatch Lag (React State Propagation):")
            print(f"   Mean: {mean(dispatch_lags):.2f}ms")
            print(f"   Median: {median(dispatch_lags):.2f}ms")
            print(f"   Min: {min(dispatch_lags):.2f}ms")
            print(f"   Max: {max(dispatch_lags):.2f}ms")
            if len(dispatch_lags) > 1:
                print(f"   Std Dev: {stdev(dispatch_lags):.2f}ms")
            
            if max(dispatch_lags) > 10:
                print(f"   ⚠️  WARNING: Dispatch lag > 10ms detected!")
                print(f"       Consider optimizing React re-render performance.")
        
        # Individual render duration analysis
        if self.renders:
            render_durations = [r['duration'] for r in self.renders]
            print(f"\n🎨 Individual Render Durations (OSMD Step Renders):")
            print(f"   Mean: {mean(render_durations):.2f}ms")
            print(f"   Median: {median(render_durations):.2f}ms")
            print(f"   Min: {min(render_durations):.2f}ms")
            print(f"   Max: {max(render_durations):.2f}ms")
            if len(render_durations) > 1:
                print(f"   Std Dev: {stdev(render_durations):.2f}ms")
            
            if max(render_durations) > 10:
                print(f"   ⚠️  WARNING: Render duration > 10ms detected!")
                print(f"       Score complexity or rendering optimization may be needed.")
        
        # Total OSMD lag analysis (cursor movement + all renders)
        osmd_lags = [f['total_osmd_lag'] for f in self.finals if f['total_osmd_lag'] is not None]
        if osmd_lags:
            print(f"\n🎯 Total OSMD Lag (Cursor Movement + All Renders):")
            print(f"   Mean: {mean(osmd_lags):.2f}ms")
            print(f"   Median: {median(osmd_lags):.2f}ms")
            print(f"   Min: {min(osmd_lags):.2f}ms")
            print(f"   Max: {max(osmd_lags):.2f}ms")
            if len(osmd_lags) > 1:
                print(f"   Std Dev: {stdev(osmd_lags):.2f}ms")
            
            if max(osmd_lags) > 50:
                print(f"   ⚠️  WARNING: OSMD lag > 50ms detected!")
                print(f"       Consider optimizing cursor movement logic or reducing renders.")
        
        # Total lag analysis
        if dispatch_lags and osmd_lags and len(dispatch_lags) == len(osmd_lags):
            total_lags = [d + o for d, o in zip(dispatch_lags, osmd_lags)]
            print(f"\nTotal Cursor Lag (Dispatch + OSMD):")
            print(f"   Mean: {mean(total_lags):.2f}ms")
            print(f"   Median: {median(total_lags):.2f}ms")
            print(f"   Min: {min(total_lags):.2f}ms")
            print(f"   Max: {max(total_lags):.2f}ms")
            if len(total_lags) > 1:
                print(f"   Std Dev: {stdev(total_lags):.2f}ms")
            
            # Breakdown
            avg_dispatch = mean(dispatch_lags)
            avg_osmd = mean(osmd_lags)
            total_avg = avg_dispatch + avg_osmd
            
            print(f"\nAverage Lag Breakdown:")
            print(f"   Dispatch Lag: {avg_dispatch:.2f}ms ({avg_dispatch/total_avg*100:.1f}%)")
            print(f"   OSMD Lag: {avg_osmd:.2f}ms ({avg_osmd/total_avg*100:.1f}%)")
            
            if avg_dispatch > avg_osmd:
                print(f"\n💡 Recommendation: Focus on optimizing React dispatch/state propagation")
            else:
                print(f"\n💡 Recommendation: Focus on optimizing OSMD cursor movement and rendering")
        
        # Renders per beat analysis
        if self.finals:
            beats_with_renders = defaultdict(int)
            for render in self.renders:
                # Find which beat this render belongs to
                target_beat = None
                for final in self.finals:
                    if abs(render['beat'] - final['beat']) < 0.01 or render['beat'] < final['beat']:
                        target_beat = final['beat']
                        break
                if target_beat:
                    beats_with_renders[target_beat] += 1
            
            if beats_with_renders:
                render_counts = list(beats_with_renders.values())
                print(f"\nRenders Per Beat Movement:")
                print(f"   Mean: {mean(render_counts):.2f}")
                print(f"   Median: {median(render_counts):.2f}")
                print(f"   Min: {min(render_counts)}")
                print(f"   Max: {max(render_counts)}")
        
        print("\n" + "="*70)
        print("Analysis complete!")
        print("="*70 + "\n")

def main():
    print("Cursor Lag Analysis Parser")
    print("Paste your console logs below (Ctrl+D when done):\n")
    
    analyzer = TimingAnalyzer()
    
    try:
        for line in sys.stdin:
            analyzer.parse_line(line)
    except KeyboardInterrupt:
        print("\n\nInterrupted by user")
    
    analyzer.analyze()

if __name__ == '__main__':
    main()
