import { useCallback, useEffect, useRef, useState } from 'react';
import { getPomodoroMode } from '../constants/pomodoroModes';
import { playAlarm } from '../services/audioService';
import { formatTimer } from '../utils/time';

export function useTimer(mode, durationInSeconds) {
  const getCurrentDuration = useCallback((currentMode = mode) => {
    if (currentMode === mode && durationInSeconds) return durationInSeconds;

    return getPomodoroMode(currentMode).durationInSeconds;
  }, [durationInSeconds, mode]);

  const [remainingSeconds, setRemainingSeconds] = useState(() => getCurrentDuration());
  const [isRunning, setIsRunning] = useState(false);
  const remainingSecondsRef = useRef(remainingSeconds);
  const modeRef = useRef(mode);
  const durationRef = useRef(durationInSeconds);

  useEffect(() => {
    const modeChanged = modeRef.current !== mode;
    const durationChanged = durationRef.current !== durationInSeconds;

    if (modeChanged || durationChanged) {
      const resetSeconds = getCurrentDuration();

      remainingSecondsRef.current = resetSeconds;
      setRemainingSeconds(resetSeconds);
      setIsRunning(false);
    }

    modeRef.current = mode;
    durationRef.current = durationInSeconds;
  }, [durationInSeconds, getCurrentDuration, mode]);

  useEffect(() => {
    if (!isRunning) return undefined;

    const intervalId = window.setInterval(() => {
      const nextSeconds = remainingSecondsRef.current - 1;

      if (nextSeconds <= 0) {
        const resetSeconds = durationRef.current ?? getPomodoroMode(modeRef.current).durationInSeconds;
        remainingSecondsRef.current = resetSeconds;
        setRemainingSeconds(resetSeconds);
        setIsRunning(false);
        playAlarm().catch(() => undefined);
        return;
      }

      remainingSecondsRef.current = nextSeconds;
      setRemainingSeconds(nextSeconds);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  const toggleTimer = useCallback(() => {
    setIsRunning((running) => !running);
  }, []);

  return {
    formattedTime: formatTimer(remainingSeconds),
    isRunning,
    toggleTimer,
  };
}
