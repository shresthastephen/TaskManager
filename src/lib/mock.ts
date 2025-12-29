import type { Task } from "../services/types";

const STORAGE_KEY = 'task-tracker-tasks';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Sample initial tasks
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago (overdue)
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Review quarterly report',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // Tomorrow (soon)
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Team meeting preparation',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    status: 'done',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Update documentation',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
];

const getStoredTasks = (): Task[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks));
  return initialTasks;
};

const setStoredTasks = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const mockApi = {
  getTasks: async (): Promise<Task[]> => {
    await delay(300);
    return getStoredTasks();
  },

  createTask: async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
    await delay(300);
    const tasks = getStoredTasks();
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    setStoredTasks(tasks);
    return newTask;
  },

  updateTask: async (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Promise<Task> => {
    await delay(300);
    const tasks = getStoredTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    tasks[index] = { ...tasks[index], ...updates };
    setStoredTasks(tasks);
    return tasks[index];
  },

  deleteTask: async (id: string): Promise<void> => {
    await delay(300);
    const tasks = getStoredTasks();
    const filtered = tasks.filter(t => t.id !== id);
    setStoredTasks(filtered);
  },
};
