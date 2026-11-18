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

  return (
    <section className={styles.board} aria-labelledby="task-board-heading">
      <p className={styles.currentTask} aria-live="polite">
        <span className={styles.currentLabel}>#TRANSMISSÃO ATIVA:</span>
        <strong className={styles.currentName}>Nenhuma missão conectada</strong>
      </p>

      <div className={styles.header}>
        <h2 id="task-board-heading" className={styles.heading}>Fila de missões</h2>
        <TaskMenu onClearAll={clearAll} onClearCompleted={clearCompleted} />
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {isLoading ? <p className={styles.status}>Conectando à rede de missões...</p> : <TaskList onEdit={openEditForm} onToggle={toggleTask} tasks={tasks} />}

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
