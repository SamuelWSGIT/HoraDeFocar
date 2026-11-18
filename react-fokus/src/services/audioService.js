let musicAudio;
let alarmAudio;
let alarmContext;
let alarmBuffer;
let alarmBufferPromise;
let alarmSource;

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

function getAlarmContext() {
  if (typeof window === 'undefined') return null;

  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor) return null;

  alarmContext ??= new AudioContextConstructor();
  return alarmContext;
}

function loadAlarmBuffer(context) {
  if (alarmBuffer) return Promise.resolve(alarmBuffer);
  if (alarmBufferPromise) return alarmBufferPromise;

  alarmBufferPromise = fetch('/sounds/ta-da-2.mp3')
    .then((response) => {
      if (!response.ok) throw new Error('Não foi possível carregar o alarme.');
      return response.arrayBuffer();
    })
    .then((data) => context.decodeAudioData(data))
    .then((buffer) => {
      alarmBuffer = buffer;
      return buffer;
    })
    .catch((error) => {
      alarmBufferPromise = undefined;
      throw error;
    });

  return alarmBufferPromise;
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
  const context = getAlarmContext();

  if (context) {
    try {
      // resume() precisa ser chamado durante a interação do usuário. Depois
      // disso, o alarme pode ser disparado pelo timer sem ser bloqueado pelo iOS.
      await context.resume();
      void loadAlarmBuffer(context);
      return;
    } catch {
      // Continua com o fallback de HTMLAudioElement abaixo.
    }
  }

  const audio = getAlarmAudio();
  if (!audio) return;

  const previousMuted = audio.muted;
  const previousVolume = audio.volume;

  try {
    audio.muted = true;
    audio.volume = 0;
    await audio.play();
    audio.pause();
    audio.currentTime = 0;
  } catch {
    // O aviso será tentado novamente ao finalizar o timer.
  } finally {
    audio.muted = previousMuted;
    audio.volume = previousVolume;
  }
}

export async function playAlarm() {
  // A trilha precisa parar mesmo se o Safari bloquear o alarme.
  stopMusic();

  const context = getAlarmContext();

  if (context) {
    try {
      if (context.state === 'suspended') await context.resume();

      const buffer = await loadAlarmBuffer(context);
      alarmSource?.stop();
      alarmSource = context.createBufferSource();
      alarmSource.buffer = buffer;
      alarmSource.connect(context.destination);
      alarmSource.start(0);
      return true;
    } catch {
      // Usa o elemento de áudio como fallback em navegadores sem Web Audio.
    }
  }

  const audio = getAlarmAudio();
  if (!audio) return false;

  audio.currentTime = 0;

  try {
    await audio.play();
    return true;
  } catch {
    return false;
  }
}
