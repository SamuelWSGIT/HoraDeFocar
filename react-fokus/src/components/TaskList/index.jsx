import { Icon } from '../Icon';
import styles from './TaskList.module.css';

export function TaskList({ tasks = [], onToggle, onEdit }) {
  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <li className={`${styles.item} ${task.completed ? styles.complete : ''}`} key={task.id}>
          <button
            className={styles.status}
            type="button"
            aria-label={task.completed ? 'Marcar tarefa como pendente' : 'Marcar tarefa como concluída'}
            aria-pressed={task.completed}
            onClick={() => onToggle?.(task)}
          >
            {task.completed ? '✓' : '○'}
          </button>
          <p className={styles.description}>{task.description}</p>
          <button className={styles.edit} type="button" aria-label="Editar tarefa" onClick={() => onEdit?.(task)}>
            <Icon name="edit" size="lg" />
          </button>
        </li>
      ))}
    </ul>
  );
}
