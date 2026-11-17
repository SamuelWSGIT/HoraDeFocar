import { Icon } from '../Icon';
import { TaskForm } from '../TaskForm';
import { TaskList } from '../TaskList';
import { TaskMenu } from '../TaskMenu';
import styles from './TaskBoard.module.css';

export function TaskBoard({ tasks = [] }) {
  return (
    <section className={styles.board} aria-labelledby="task-board-heading">
      <p className={styles.currentTask} aria-live="polite">
        <span className={styles.currentLabel}>#TRANSMISSÃO ATIVA:</span>
        <strong className={styles.currentName}>Nenhuma missão conectada</strong>
      </p>

      <div className={styles.header}>
        <h2 id="task-board-heading" className={styles.heading}>Fila de missões</h2>
        <TaskMenu />
      </div>

      <TaskList tasks={tasks} />
      <TaskForm />
      <button className={styles.addButton} type="button">
        <Icon name="add" />
        Adicionar missão
      </button>
    </section>
  );
}
