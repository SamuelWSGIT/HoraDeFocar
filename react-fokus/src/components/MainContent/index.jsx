import { Banner } from '../Banner';
import { TaskBoard } from '../TaskBoard';
import { TimerCard } from '../TimerCard';
import styles from './MainContent.module.css';

export function MainContent() {
  return (
    <main id="main-content" className={styles.main}>
      <Banner
        title="Otimize sua produtividade"
        highlight="Mergulhe no que importa"
        imageUrl="/mode-1.png"
        imageAlt="Operadora cyberpunk concentrada diante de um painel holográfico"
      />
      <TimerCard />
      <TaskBoard />
    </main>
  );
}
