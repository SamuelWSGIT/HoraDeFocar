import { useActionState } from 'react';
import { Icon } from '../Icon';
import styles from './TaskList.module.css';

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  tasks?: Task[];
  onToggle?: (task: Task) => Promise<void>;
  onEdit?: (task: Task) => void;
}

export function TaskList({ tasks = [], onToggle, onEdit }: TaskListProps) {
  const [, taskAction, isPending] = useActionState<string | null, FormData>(async (_: string | null, formData: FormData): Promise<string | null> => {
    const [action, taskId] = String(formData.get('action')).split(':');
    const task = tasks.find((item) => String(item.id) === taskId);

    if (!task) return action;

    if (action === 'toggle') {
      await onToggle?.(task);
    } else if (action === 'edit') {
      onEdit?.(task);
    }

    return action;
  }, null);

  return (
    <form action={taskAction} className={styles.form}>
      <ul className={styles.list}>
        {tasks.map((task) => (
          <li className={`${styles.item} ${task.completed ? styles.complete : ''}`} key={task.id}>
            <button
              aria-label={task.completed ? 'Marcar tarefa como pendente' : 'Marcar tarefa como conclu\u00edda'}
              aria-pressed={task.completed}
              className={styles.status}
              disabled={isPending}
              name="action"
              type="submit"
              value={`toggle:${task.id}`}
            >
              {task.completed ? '\u2713' : '\u25cb'}
            </button>
            <p className={styles.description}>{task.description}</p>
            <button
              aria-label="Editar tarefa"
              className={styles.edit}
              disabled={isPending}
              name="action"
              type="submit"
              value={`edit:${task.id}`}
            >
              <Icon name="edit" size="lg" />
            </button>
          </li>
        ))}
      </ul>
    </form>
  );
}
