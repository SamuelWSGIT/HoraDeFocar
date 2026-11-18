let musicAudio;
let alarmAudio;

function createAudio(source) {
  if (typeof Audio === 'undefined') return null;

  return new Audio(source);
}

function getMusicAudio() {
  musicAudio ??= createAudio('/sounds/lofi.mp3');

  if (musicAudio) musicAudio.loop = true;
  return musicAudio;
}

function getAlarmAudio() {
  alarmAudio ??= createAudio('/sounds/ta-da-2.mp3');
  return alarmAudio;
}

export async function setMusicEnabled(enabled) {
  const musicAudio = getMusicAudio();
  if (!musicAudio) return;

  if (enabled) {
    await musicAudio.play();
  } else {
    musicAudio.pause();
  }
}

export function stopMusic() {
  const musicAudio = getMusicAudio();
  if (!musicAudio) return;

  musicAudio.pause();
  musicAudio.currentTime = 0;
}

export async function playAlarm() {
  const audio = getAlarmAudio();
  const musicAudio = getMusicAudio();
  if (!audio) return;

  audio.currentTime = 0;
  await audio.play();
  musicAudio?.pause();
}
