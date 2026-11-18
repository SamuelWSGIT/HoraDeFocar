import {
  DEFAULT_POMODORO_DURATIONS_IN_SECONDS,
  POMODORO_MODE_IDS,
} from '../constants/pomodoroModes';

const STORAGE_KEY = 'react-fokus:pomodoro-durations-seconds';
const LEGACY_STORAGE_KEY = 'react-fokus:pomodoro-durations';
const MIN_DURATION_IN_SECONDS = 1;
const MAX_DURATION_IN_SECONDS = 24 * 60 * 60;

function sanitizeDuration(value, fallback) {
  const duration = Number(value);

  if (!Number.isFinite(duration)) return fallback;

  return Math.min(
    MAX_DURATION_IN_SECONDS,
    Math.max(MIN_DURATION_IN_SECONDS, Math.round(duration)),
  );
}

export function normalizePomodoroDurations(durations = {}) {
  return Object.fromEntries(
    POMODORO_MODE_IDS.map((modeId) => [
      modeId,
      sanitizeDuration(
        durations[modeId],
        DEFAULT_POMODORO_DURATIONS_IN_SECONDS[modeId],
      ),
    ]),
  );
}

function readStoredDurations(storageKey) {
  try {
    const storedDurations = window.localStorage.getItem(storageKey);
    return storedDurations ? JSON.parse(storedDurations) : null;
  } catch {
    return null;
  }
}

export function getPomodoroDurations() {
  if (typeof window === 'undefined') {
    return normalizePomodoroDurations();
  }

  const storedDurations = readStoredDurations(STORAGE_KEY);
  if (storedDurations) {
    return normalizePomodoroDurations(storedDurations);
  }

  const legacyDurations = readStoredDurations(LEGACY_STORAGE_KEY);
  if (legacyDurations) {
    const migratedDurations = Object.fromEntries(
      POMODORO_MODE_IDS.map((modeId) => [modeId, Number(legacyDurations[modeId]) * 60]),
    );

    return normalizePomodoroDurations(migratedDurations);
  }

  return normalizePomodoroDurations();
}

export function savePomodoroDurations(durations) {
  const normalizedDurations = normalizePomodoroDurations(durations);

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedDurations));
  } catch {
    // O armazenamento pode estar indisponível no navegador.
  }

  return normalizedDurations;
}
