export interface Task {
  id: number;
  description: string;
  completed: boolean;
}

const STORAGE_KEY = 'react-fokus:tasks';

function readTasks(): Task[] {
  if (typeof window === 'undefined') return [];

  try {
    const storedTasks = window.localStorage.getItem(STORAGE_KEY);
    if (!storedTasks) return [];

    const parsedTasks: unknown = JSON.parse(storedTasks);
    if (!Array.isArray(parsedTasks)) return [];

    return parsedTasks
      .filter(isStoredTask)
      .map((task) => ({
        id: Number(task.id),
        description: task.description,
        completed: task.completed,
      }));
  } catch {
    return [];
  }
}

function isStoredTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) return false;

  const task = value as Partial<Task>;
  return (
    Number.isFinite(Number(task.id)) &&
    typeof task.description === 'string' &&
    typeof task.completed === 'boolean'
  );
}

function saveTasks(tasks: Task[]) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    throw new Error('Não foi possível salvar as missões localmente.');
  }
}

export async function getTasks(): Promise<Task[]> {
  return readTasks();
}

export async function createTask(description: string): Promise<Task> {
  const tasks = readTasks();
  const nextId = tasks.reduce((largestId, task) => Math.max(largestId, task.id), 0) + 1;
  const newTask: Task = {
    id: nextId,
    description,
    completed: false,
  };

  saveTasks([...tasks, newTask]);
  return newTask;
}

export async function updateTask(id: number, task: Task): Promise<Task | undefined> {
  const tasks = readTasks();
  const updatedTask = { ...task, id };
  const taskExists = tasks.some((currentTask) => currentTask.id === id);

  if (!taskExists) return undefined;

  saveTasks(
    tasks.map((currentTask) =>
      currentTask.id === id ? updatedTask : currentTask,
    ),
  );

  return updatedTask;
}

export async function deleteTask(id: number): Promise<void> {
  const tasks = readTasks();
  saveTasks(tasks.filter((task) => task.id !== id));
}

/*
  Implementação anterior com API, preservada para uma futura reativação:

  const API_URL = import.meta.env.VITE_TASKS_API_URL ?? 'http://localhost:4242/tasks';

  async function parseResponse(response: Response) {
    if (!response.ok) {
      throw new Error(`Erro na API de tarefas: ${response.status}`);
    }

    return response.json();
  }

  export async function getTasks() {
    const response = await fetch(API_URL);
    return parseResponse(response);
  }

  export async function createTask(description: string) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, completed: false }),
    });

    return parseResponse(response);
  }

  export async function updateTask(id: number, task: Task) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });

    return parseResponse(response);
  }

  export async function deleteTask(id: number) {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

    if (!response.ok) {
      throw new Error(`Erro ao excluir tarefa: ${response.status}`);
    }
  }
*/
