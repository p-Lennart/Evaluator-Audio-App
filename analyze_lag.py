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
    
    # Patterns with optional sequence numbers
    dispatch_pattern = r'🎵 DISPATCHING BEAT UPDATE: ([\d.]+) at time ([\d.]+)s.*DispatchTime=(\d+)(?:, Seq=(\d+))?'
    render_pattern = r'\[Cursor Render\] Beat=([\d.]+), RenderTime=(\d+)(?:, Seq=(\d+))?'
    
    print(f"Searching for patterns in log file...")
    print(f"Sample dispatch pattern: 🎵 DISPATCHING BEAT UPDATE: 1.0 at time 0.500s (predicted: 0.500s), DispatchTime=1234567890, Seq=0")
    print(f"Sample render pattern: [Cursor Render] Beat=1.0, RenderTime=1234567890, Seq=0")
    
    dispatches = re.findall(dispatch_pattern, content)
    renders = re.findall(render_pattern, content)
    
    print("="*70)
    print(f"Analysis of Cursor Lag")
    print("="*70)
    print(f"Total Dispatch Events: {len(dispatches)}")
    print(f"Total Render Events: {len(renders)}")
    
    if not dispatches:
        print("\n❌ No dispatch events found in logs!")
        return
    
    if not renders:
        print("\n❌ No render events found in logs!")
        return
    
    # Check if we have sequence numbers
    has_seq = dispatches[0][3] != '' if len(dispatches[0]) > 3 else False
    
    if has_seq:
        print("✅ Sequence numbers detected - using precise matching")
        lags, matched_beats = match_by_sequence(dispatches, renders)
    else:
        print("⚠️  No sequence numbers - using timestamp-based matching")
        print("   (Add Seq logging for more accurate analysis)")
        lags, matched_beats = match_by_timestamp(dispatches, renders)
    
    if not lags:
        print("\n❌ No matching dispatch-render pairs found!")
        return
    
    # Statistics
    print(f"\n📊 LAG STATISTICS (Dispatch → Render)")
    print("-"*70)
    print(f"Matched Beat Updates: {len(lags)}")
    print(f"Best Response Time: {min(lags):.0f}ms")
    print(f"Average Lag: {mean(lags):.1f}ms")
    print(f"Median Lag: {median(lags):.1f}ms")
    print(f"Worst Lag: {max(lags):.0f}ms")
    
    # Performance categorization
    excellent = sum(1 for lag in lags if 0 <= lag < 16)
    good = sum(1 for lag in lags if 16 <= lag < 50)
    acceptable = sum(1 for lag in lags if 50 <= lag < 100)
    poor = sum(1 for lag in lags if lag >= 100)
    negative = sum(1 for lag in lags if lag < 0)
    
    print(f"\n⚡ PERFORMANCE BREAKDOWN:")
    print("-"*70)
    print(f"Excellent (<16ms):     {excellent:3d}/{len(lags)} ({excellent/len(lags)*100:5.1f}%)")
    print(f"Good (16-50ms):        {good:3d}/{len(lags)} ({good/len(lags)*100:5.1f}%)")
    print(f"Acceptable (50-100ms): {acceptable:3d}/{len(lags)} ({acceptable/len(lags)*100:5.1f}%)")
    print(f"Poor (>100ms):         {poor:3d}/{len(lags)} ({poor/len(lags)*100:5.1f}%)")
    if negative > 0:
        print(f"⚠️  NEGATIVE (bug):     {negative:3d}/{len(lags)} ({negative/len(lags)*100:5.1f}%)")
    
    # Show worst offenders
    print(f"\n⚠️  WORST LAG EVENTS:")
    print("-"*70)
    positive_matched = [m for m in matched_beats if m[3] >= 0]
    if positive_matched:
        worst = sorted(positive_matched, key=lambda x: x[3], reverse=True)[:10]
        for beat, d_time, r_time, lag in worst:
            print(f"Beat {beat:6.2f}: {lag:4.0f}ms lag (Dispatch: {d_time}, Render: {r_time})")
    
    # Show best performers
    print(f"\n✅ BEST LAG EVENTS:")
    print("-"*70)
    best = sorted(positive_matched, key=lambda x: x[3])[:10] if positive_matched else []
    for beat, d_time, r_time, lag in best:
        print(f"Beat {beat:6.2f}: {lag:4.0f}ms lag (Dispatch: {d_time}, Render: {r_time})")
    
    if negative > 0:
        print(f"\n❌ NEGATIVE LAG EVENTS (Matching Errors):")
        print("-"*70)
        neg_matched = [m for m in matched_beats if m[3] < 0]
        for beat, d_time, r_time, lag in sorted(neg_matched, key=lambda x: x[3])[:10]:
            print(f"Beat {beat:6.2f}: {lag:4.0f}ms (Render BEFORE Dispatch!)")
    
    # Diagnosis
    print(f"\n🔍 DIAGNOSIS:")
    print("-"*70)
    avg_lag = mean([l for l in lags if l >= 0]) if any(l >= 0 for l in lags) else mean(lags)
    
    if negative > 0:
        print(f"❌ {negative} negative lags detected!")
        if not has_seq:
            print("   → Likely cause: Incorrect beat matching without sequence numbers")
            print("   → Solution: Add Seq logging to both dispatch and render")
        else:
            print("   → This shouldn't happen with sequence numbers - check your logging!")
    
    if avg_lag < 50:
        print("✅ Average performance is good!")
    elif avg_lag < 100:
        print("⚠️  Noticeable lag exists. Consider optimizations.")
    else:
        print("❌ Significant lag detected. Immediate action needed!")
    
    if poor > len(lags) * 0.1:
        print(f"❌ {poor/len(lags)*100:.1f}% of updates have >100ms lag")
        print("   → This is very noticeable to users")
    
    if excellent < len(lags) * 0.5:
        print("⚠️  Less than 50% of updates are frame-perfect (<16ms)")
        print("   → React state update chain is likely causing delays")
        print("   → Solution: Remove useEffect chain in ScoreDisplay.tsx")
        print("   → Consolidate into single useEffect that directly responds to state.estimatedBeat")

def match_by_sequence(dispatches, renders):
    """Match events using sequence numbers (most accurate)"""
    lags = []
    matched_beats = []
    
    # Build lookups
    dispatch_by_seq = {}
    render_by_seq = {}
    
    for beat, audio_time, dispatch_time, seq in dispatches:
        if seq:
            dispatch_by_seq[int(seq)] = (float(beat), int(dispatch_time), float(audio_time))
    
    for beat, render_time, seq in renders:
        if seq:
            render_by_seq[int(seq)] = (float(beat), int(render_time))
    
    # Match by sequence number
    for seq in sorted(dispatch_by_seq.keys()):
        if seq in render_by_seq:
            d_beat, d_time, audio_time = dispatch_by_seq[seq]
            r_beat, r_time = render_by_seq[seq]
            
            # Verify beats match
            if abs(d_beat - r_beat) < 0.01:
                lag = r_time - d_time
                lags.append(lag)
                matched_beats.append((d_beat, d_time, r_time, lag))
    
    return lags, matched_beats

def match_by_timestamp(dispatches, renders):
    """Match events by timestamp (less accurate, but works without Seq)"""
    # Build chronological event lists
    dispatch_events = []
    render_events = []
    
    for beat, audio_time, dispatch_time, *_ in dispatches:
        dispatch_events.append((int(dispatch_time), float(beat), float(audio_time)))
    
    for beat, render_time, *_ in renders:
        render_events.append((int(render_time), float(beat)))
    
    # Sort by timestamp
    dispatch_events.sort()
    render_events.sort()
    
    print(f"\nTimestamp matching strategy:")
    print(f"  - For each dispatch, find the LAST render of that beat that occurs after dispatch")
    print(f"  - This handles cases where cursor steps through multiple intermediate beats")
    
    lags = []
    matched_beats = []
    unmatched = []
    used_renders = set()
    
    # For each dispatch, find the LAST render of the same beat AFTER it
    for d_time, d_beat, audio_time in dispatch_events:
        # Find ALL renders of this beat that occur after dispatch
        candidates = []
        for i, (r_time, r_beat) in enumerate(render_events):
            if i in used_renders:
                continue
            # Same beat (within 0.01), and render happens after dispatch
            if abs(r_beat - d_beat) < 0.01 and r_time >= d_time:
                candidates.append((i, r_time, r_beat, r_time - d_time))
        
        if candidates:
            # Take the LAST render (highest timestamp) of this beat
            # This is when the cursor actually settled on the target beat
            candidates.sort(key=lambda x: x[1])  # Sort by render time
            idx, r_time, r_beat, lag = candidates[-1]  # Take last one
            used_renders.add(idx)
            lags.append(lag)
            matched_beats.append((d_beat, d_time, r_time, lag))
        else:
            unmatched.append((d_beat, d_time))
    
    if unmatched:
        print(f"\n⚠️  {len(unmatched)} dispatches had no matching render:")
        for beat, d_time in unmatched[:5]:
            print(f"   Beat {beat:.2f} dispatched at {d_time}")
    
    return lags, matched_beats

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 analyze_lag.py console_logs.txt")
        print("\nTo capture logs:")
        print("  1. Open browser console")
        print("  2. Run your performance")
        print("  3. Right-click console → Save as... → logs.txt")
        print("\nFor best results, add sequence numbers to your logging:")
        print("  - Add dispatchSequenceRef.current++ in ScoreFollowerTest.tsx")
        print("  - Add renderSequenceRef.current++ in ScoreDisplay.tsx")
        sys.exit(1)
    
    parse_cursor_logs(sys.argv[1])