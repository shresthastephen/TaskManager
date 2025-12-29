import type { Task, TaskSort } from "../services/types";
import { TaskRow } from './TaskRow';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from "../lib/utils";

interface TaskTableProps {
  tasks: Task[];
  sort: TaskSort;
  onToggleSort: (field: TaskSort['field']) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  loading?: boolean;
}

function SortIcon({
  field,
  sort,
}: {
  field: TaskSort['field'];
  sort: TaskSort;
}) {
  if (sort.field !== field) {
    return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
  }

  return sort.direction === 'asc' ? (
    <ArrowUp className="h-4 w-4 text-blue-600" />
  ) : (
    <ArrowDown className="h-4 w-4 text-blue-600" />
  );
}

export function TaskTable({
  tasks,
  sort,
  onToggleSort,
  onEdit,
  onDelete,
  loading,
}: TaskTableProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <p className="text-lg font-medium">No tasks found</p>
        <p className="text-sm">
          Try adjusting your filters or add a new task
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {/* Title */}
            <th className="px-6 py-3 text-left">
              <button
                type="button"
                onClick={() => onToggleSort('title')}
                className={cn(
                  'flex items-center gap-1 -ml-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider',
                  sort.field === 'title'
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-gray-900'
                )}
              >
                Title
                <SortIcon field="title" sort={sort} />
              </button>
            </th>

            {/* Due date */}
            <th className="px-6 py-3 text-left">
              <button
                type="button"
                onClick={() => onToggleSort('dueDate')}
                className={cn(
                  'flex items-center gap-1 -ml-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider',
                  sort.field === 'dueDate'
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-gray-900'
                )}
              >
                Due Date
                <SortIcon field="dueDate" sort={sort} />
              </button>
            </th>

            {/* Status */}
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Status
            </th>

            {/* Actions */}
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
