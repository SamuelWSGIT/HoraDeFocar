import { useTaskBoard } from '../../hooks/useTaskBoard';
import { Icon } from '../Icon';
import { TaskForm } from '../TaskForm';
import { TaskList } from '../TaskList';
import { TaskMenu } from '../TaskMenu';
import styles from './TaskBoard.module.css';

export function TaskBoard() {
  const {
    clearAll,
    clearCompleted,
    deleteEditingTask,
    description,
    editingTask,
    error,
    isFormOpen,
    isLoading,
    openCreateForm,
    openEditForm,
    closeForm,
    setDescription,
    submitTask,
    tasks,
    toggleTask,
  } = useTaskBoard();

  const missions = tasks as Mission[];
  const availableMissions = missions.filter((task) => !task.completed).length;
  const completedMissions = missions.filter((task) => task.completed).length;

  return (
    <section className={styles.board} aria-labelledby="task-board-heading">
      <p className={styles.currentTask} aria-live="polite">
        <span className={styles.currentLabel}>#TRANSMISS&Atilde;O ATIVA:</span>
        <strong className={styles.currentName}>
          {isLoading
            ? 'Sincronizando missões...'
            : `${formatMissionCount(availableMissions, 'missão disponível', 'missões disponíveis')} · ${formatMissionCount(completedMissions, 'missão completa', 'missões completas')}`}
        </strong>
      </p>

      <div className={styles.header}>
        <h2 id="task-board-heading" className={styles.heading}>
          Fila de missões
        </h2>
        <TaskMenu onClearAll={clearAll} onClearCompleted={clearCompleted} />
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {isLoading ? (
        <p className={styles.status}>Conectando à rede de missões...</p>
      ) : (
        <TaskList onEdit={openEditForm} onToggle={toggleTask} tasks={tasks} />
      )}

      {isFormOpen && (
        <TaskForm
          description={description}
          editing={Boolean(editingTask)}
          onChange={setDescription}
          onCancel={closeForm}
          onDelete={deleteEditingTask}
          onSubmit={submitTask}
        />
      )}

      {!isFormOpen && (
        <button className={styles.addButton} type="button" onClick={openCreateForm}>
          <Icon name="add" />
          Adicionar missão
        </button>
      )}
    </section>
  );
}

function formatMissionCount(count: number, singular: string, plural: string) {
  return `${count} ${count === 1 ? singular : plural}`;
}

interface Mission {
  completed: boolean;
}
