import { cn } from "../lib/utils";
import { getDueDateStatus } from "./DueDateBadge";

interface StatusBadgeProps {
  status: 'pending' | 'done';
  dueDate: string;
}

export function StatusBadge({ status, dueDate }: StatusBadgeProps) {
  const dateStatus = getDueDateStatus(dueDate, status);

  const labelMap = {
    completed: 'Done',
    overdue: 'Overdue',
    soon: 'Pending',
    normal: 'Pending',
  };

  const statusClasses = {
    completed: 'bg-green-100 text-green-700',
    overdue: 'bg-red-100 text-red-700',
    soon: 'bg-yellow-100 text-yellow-700',
    normal: 'bg-gray-100 text-gray-700',
  };

  return (
    <span
      className={cn(
        'inline-flex rounded-full px-3 py-1 text-xs font-medium',
        statusClasses[dateStatus]
      )}
    >
      {labelMap[dateStatus]}
    </span>
  );
}
