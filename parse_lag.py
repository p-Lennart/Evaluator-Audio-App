import re

dispatch_re = re.compile(r"DISPATCHING BEAT UPDATE: (\d+) .*DispatchTime=(\d+)")
render_re = re.compile(r"\[Cursor Render\] Beat=(\d+), RenderTime=(\d+)")

dispatch_times = {}
render_times = {}

with open("logs.txt") as f:
    for line in f:
        d = dispatch_re.search(line)
        if d:
            beat = int(d.group(1))
            t = int(d.group(2))
            dispatch_times.setdefault(beat, []).append(t)
        r = render_re.search(line)
        if r:
            beat = int(r.group(1))
            t = int(r.group(2))
            render_times.setdefault(beat, []).append(t)

print("Beat\tDispatchTime\tRenderTime\tLag(ms)")
for beat in sorted(dispatch_times):
    d_list = dispatch_times[beat]
    r_list = render_times.get(beat, [])
    for i, d_time in enumerate(d_list):
        r_time = r_list[i] if i < len(r_list) else None
        lag = (r_time - d_time) if r_time else None
        print(f"{beat}\t{d_time}\t{r_time}\t{lag}")