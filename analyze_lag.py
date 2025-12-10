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
    
    # Patterns with optional sequence numbers and ISO timestamp prefix
    dispatch_pattern = r'DISPATCHING BEAT UPDATE: ([\d.]+) at time ([\d.]+)s.*?DispatchTime=(\d+)(?:, Seq=(\d+))?'
    render_pattern = r'\[Cursor Render\] Beat=([\d.]+), RenderTime=(\d+)(?:, Seq=(\d+))?'
    
    print(f"Searching for patterns in log file...")
    print(f"Sample dispatch pattern: DISPATCHING BEAT UPDATE: 1.0 at time 0.500s, DispatchTime=1234567890")
    print(f"Sample render pattern: [Cursor Render] Beat=1.0, RenderTime=1234567890")
    
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
        lags, matched_beats, unmatched = match_by_sequence(dispatches, renders)
    else:
        print("⚠️  No sequence numbers - using IMPROVED timestamp-based matching")
        print("   (Add Seq logging for more accurate analysis)")
        lags, matched_beats, unmatched = match_by_timestamp_improved(dispatches, renders)
    
    if not lags:
        print("\n❌ No matching dispatch-render pairs found!")
        print("\n🔍 DEBUG INFO:")
        print(f"First 5 dispatches: {dispatches[:5]}")
        print(f"First 5 renders: {renders[:5]}")
        return
    
    # Statistics
    print(f"\n📊 LAG STATISTICS (Dispatch → Render)")
    print("-"*70)
    print(f"Matched Beat Updates: {len(lags)}")
    print(f"Unmatched Dispatches: {len(unmatched)}")
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
    
    if unmatched:
        print(f"\n⚠️  UNMATCHED DISPATCHES ({len(unmatched)} total):")
        print("-"*70)
        print("These dispatches had no corresponding render:")
        for beat, d_time in unmatched[:10]:
            print(f"   Beat {beat:6.2f} dispatched at {d_time}")
        if len(unmatched) > 10:
            print(f"   ... and {len(unmatched) - 10} more")
    
    # Diagnosis
    print(f"\n🔍 DIAGNOSIS:")
    print("-"*70)
    avg_lag = mean([l for l in lags if l >= 0]) if any(l >= 0 for l in lags) else mean(lags)
    
    if len(unmatched) > len(lags):
        print(f"❌ More unmatched dispatches ({len(unmatched)}) than matched ({len(lags)})!")
        print("   Possible causes:")
        print("   1. Cursor is using movedBeats.current instead of target beat in logging")
        print("   2. Multiple dispatches before single render (batching)")
        print("   3. Renders are happening but beat values don't match")
        print(f"\n   → Check your logging in moveCursorByBeatsDirectJump()")
        print(f"   → Should log TARGET beat, not movedBeats.current")
    
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
    unmatched = []
    
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
        else:
            d_beat, d_time, _ = dispatch_by_seq[seq]
            unmatched.append((d_beat, d_time))
    
    return lags, matched_beats, unmatched

def match_by_timestamp_improved(dispatches, renders):
    """
    Improved timestamp matching that handles:
    1. Direct jumps (no intermediate renders)
    2. Multiple dispatches before one render
    3. Temporal proximity when beats don't match exactly
    """
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
    
    print(f"\nImproved matching strategy:")
    print(f"  - For each dispatch, find the NEAREST render that occurs AFTER dispatch")
    print(f"  - Within 200ms time window (configurable)")
    print(f"  - Allows slight beat value differences")
    
    lags = []
    matched_beats = []
    unmatched = []
    used_renders = set()
    
    MAX_TIME_WINDOW_MS = 200  # Maximum time between dispatch and render
    
    # For each dispatch, find the nearest subsequent render
    for d_time, d_beat, audio_time in dispatch_events:
        best_match = None
        best_score = float('inf')
        
        for i, (r_time, r_beat) in enumerate(render_events):
            if i in used_renders:
                continue
            
            # Must occur after dispatch
            if r_time < d_time:
                continue
            
            # Must be within time window
            time_diff = r_time - d_time
            if time_diff > MAX_TIME_WINDOW_MS:
                continue
            
            # Calculate matching score (prefer exact beat match and minimal time)
            beat_diff = abs(r_beat - d_beat)
            
            # Score: prioritize temporal proximity, but penalize beat differences
            score = time_diff + (beat_diff * 50)  # 50ms penalty per beat difference
            
            if score < best_score:
                best_score = score
                best_match = (i, r_time, r_beat, time_diff)
        
        if best_match:
            idx, r_time, r_beat, lag = best_match
            used_renders.add(idx)
            lags.append(lag)
            matched_beats.append((d_beat, d_time, r_time, lag))
        else:
            unmatched.append((d_beat, d_time))
    
    return lags, matched_beats, unmatched

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