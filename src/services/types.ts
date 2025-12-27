export type TaskStatus = 'pending' | 'done';

export interface Task {
  id: string;
  title: string;
  dueDate: string; // ISO date string
  status: TaskStatus;
  createdAt: string;
}

export type TaskFilter = 'all' | 'pending' | 'done';

export type SortField = 'dueDate' | 'title';
export type SortDirection = 'asc' | 'desc';

export interface TaskSort {
  field: SortField;
  direction: SortDirection;
}
