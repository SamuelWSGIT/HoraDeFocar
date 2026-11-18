import { usePomodoroMode } from '../../hooks/usePomodoroMode';
import { Banner } from '../Banner';
import { TaskBoard } from '../TaskBoard';
import { TimerCard } from '../TimerCard';
import styles from './MainContent.module.css';

export function MainContent() {
  const {
    durationsInSeconds,
    mode,
    modeConfig,
    selectMode,
    updateDurations,
  } = usePomodoroMode();

  return (
    <main id="main-content" className={styles.main}>
      <Banner
        title={modeConfig.title}
        highlight={modeConfig.highlight}
        imageUrl={modeConfig.imageUrl}
        imageAlt="Operadora cyberpunk concentrada diante de um painel holográfico"
        mode={mode}
      />
      <TimerCard
        durationsInSeconds={durationsInSeconds}
        mode={mode}
        onDurationsChange={updateDurations}
        onModeChange={selectMode}
        durationInSeconds={modeConfig.durationInSeconds}
      />
      <TaskBoard />
    </main>
  );
}
