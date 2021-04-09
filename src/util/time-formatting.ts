export function getReducedTimeFromTotalSeconds(totalSeconds: number) {
  const minutesInSeconds = Math.floor(totalSeconds / 60);
  const secondsRemaining = totalSeconds % 60;
  return {
    minutes: minutesInSeconds,
    seconds: secondsRemaining,
  };
}
