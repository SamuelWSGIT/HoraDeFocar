import { useCallback, useState } from 'react';
import { DEFAULT_POMODORO_MODE } from '../constants/pomodoroModes';
import { usePomodoroSettings } from './usePomodoroSettings';

export function usePomodoroMode() {
  const [mode, setMode] = useState(DEFAULT_POMODORO_MODE);
  const { durationsInSeconds, modeConfig, updateDurations } = usePomodoroSettings(mode);

  const selectMode = useCallback((nextMode) => {
    setMode(nextMode);
  }, []);

  return {
    durationsInSeconds,
    mode,
    modeConfig,
    selectMode,
    updateDurations,
  };
}
