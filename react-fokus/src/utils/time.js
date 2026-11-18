export function formatTimer(seconds) {
  const safeSeconds = Math.max(0, Math.floor(Number(seconds) || 0));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor(safeSeconds / 60) % 60;
  const remainingSeconds = safeSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${formattedMinutes}:${formattedSeconds}`;
  }

  return `${formattedMinutes}:${formattedSeconds}`;
}

export function splitDuration(totalSeconds) {
  const safeSeconds = Math.max(0, Math.floor(Number(totalSeconds) || 0));

  return {
    hours: Math.floor(safeSeconds / 3600),
    minutes: Math.floor(safeSeconds / 60) % 60,
    seconds: safeSeconds % 60,
  };
}

export function combineDuration({ hours = 0, minutes = 0, seconds = 0 }) {
  return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
}
