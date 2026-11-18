let musicAudio;
let alarmAudio;
let alarmUnlocked = false;

function createAudio(source) {
  if (typeof Audio === 'undefined') return null;

  const audio = new Audio(source);
  audio.preload = 'auto';

  return audio;
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

export async function prepareAlarm() {
  const audio = getAlarmAudio();
  if (!audio || alarmUnlocked) return;

  const previousMuted = audio.muted;
  const previousVolume = audio.volume;

  try {
    // O Safari do iPhone exige uma interação do usuário para liberar o áudio.
    // A preparação ocorre no clique de início, sem emitir som para o usuário.
    audio.muted = true;
    audio.volume = 0;
    await audio.play();
    audio.pause();
    audio.currentTime = 0;
    alarmUnlocked = true;
  } catch {
    // O aviso será tentado novamente ao finalizar o timer.
  } finally {
    audio.muted = previousMuted;
    audio.volume = previousVolume;
  }
}

export async function playAlarm() {
  const audio = getAlarmAudio();

  // A trilha precisa parar mesmo se o Safari bloquear o alarme.
  stopMusic();
  if (!audio) return false;

  audio.currentTime = 0;

  try {
    await audio.play();
    return true;
  } catch {
    return false;
  }
}
