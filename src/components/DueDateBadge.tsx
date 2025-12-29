import { cn } from "../lib/utils";

interface DueDateBadgeProps {
  dueDate: string;
  status: 'pending' | 'done';
}

export function getDueDateStatus(dueDate: string, status: 'pending' | 'done'): 'overdue' | 'soon' | 'normal' | 'completed' {
  if (status === 'done') return 'completed';

  const now = new Date();
  const due = new Date(dueDate);

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dueDay = new Date(due.getFullYear(), due.getMonth(), due.getDate());

  const diffDays = Math.ceil((dueDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'overdue';
  if (diffDays <= 2) return 'soon';
  return 'normal';
}

export function DueDateBadge({ dueDate, status }: DueDateBadgeProps) {
  const dateStatus = getDueDateStatus(dueDate, status);

  const formattedDate = new Date(dueDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const statusClasses = {
    overdue: 'bg-red-100 text-red-600',
    soon: 'bg-yellow-100 text-yellow-600',
    normal: 'bg-gray-100 text-gray-700',
    completed: 'bg-green-100 text-green-600',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        statusClasses[dateStatus]
      )}
    >
      {formattedDate}
    </span>
  );
}
