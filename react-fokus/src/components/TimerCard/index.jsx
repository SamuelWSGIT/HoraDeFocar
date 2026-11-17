import { Button } from '../Button';
import styles from './TimerCard.module.css';

export function TimerCard({time = '25:00'}) {
  return (
    <section aria-label="Timer" className={styles.card}>
      <div role="tablist" aria-label="Tipo de timer" className={styles.tabs}>
        <button className={`${styles.tab} ${styles.active}`} role="tab" type="button" aria-selected="true">
          Foco // MODO ATAQUE
        </button>
        <button className={styles.tab} role="tab" type="button" aria-selected="false">
          Descanso curto // RECARGA
        </button>
        <button className={styles.tab} role="tab" type="button" aria-selected="false">
          Descanso longo // REBOOT
        </button>
      </div>

      <span className={styles.time} role="timer" aria-live="polite" aria-label="Tempo restante">
        25:00
      </span>

      <label className={styles.musicToggle} htmlFor="toggle-music">
        <input className={styles.musicInput} type="checkbox" id="toggle-music" />
        Trilha neural
      </label>

      <form className={styles.form}>
        <Button type="submit" icon="play">Iniciar protocolo</Button>
      </form>
    </section>
  );
}
