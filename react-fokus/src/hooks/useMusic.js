import { useEffect, useState } from 'react';
import { setMusicEnabled, stopMusic } from '../services/audioService';

export function useMusic() {
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);

  useEffect(() => () => stopMusic(), []);

  useEffect(() => {
    setMusicEnabled(isMusicEnabled).catch(() => {
      setIsMusicEnabled(false);
    });
  }, [isMusicEnabled]);

  return [isMusicEnabled, setIsMusicEnabled];
}
