import { useCallback, useState } from 'react';
import { getPomodoroMode } from '../constants/pomodoroModes';
import {
  getPomodoroDurations,
  savePomodoroDurations,
} from '../services/pomodoroSettingsService';

export function usePomodoroSettings(mode) {
  const [durationsInSeconds, setDurationsInSeconds] = useState(getPomodoroDurations);

  const updateDurations = useCallback((nextDurations) => {
    setDurationsInSeconds(savePomodoroDurations(nextDurations));
  }, []);

  const modeConfig = {
    ...getPomodoroMode(mode),
    durationInSeconds: durationsInSeconds[mode],
  };

  return {
    durationsInSeconds,
    modeConfig,
    updateDurations,
  };
}
