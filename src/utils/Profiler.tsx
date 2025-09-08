// utils/Profiler.ts
const cumulativeTimers: Record<string, number> = {};
const startTimes: Record<string, number> = {};

/** start timer */
export function startTimer(name: string) {
  startTimes[name] = performance.now();
  if (!(name in cumulativeTimers)) cumulativeTimers[name] = 0;
}

/** end timer / accumulate time by name */
export function endTimer(name: string) {
  if (!(name in startTimes)) {
    console.warn(`Timer '${name}' was not started!`);
    return;
  }
  const end = performance.now();
  const elapsed = end - startTimes[name];
  cumulativeTimers[name] += elapsed;
  console.log(
    `${name} - took ${Math.round(elapsed)} ms (total ${Math.round(cumulativeTimers[name])} ms)`
  );
  delete startTimes[name];
}

/** reset cumulative timer for a name */
export function resetTimer(name: string) {
  cumulativeTimers[name] = 0;
}
