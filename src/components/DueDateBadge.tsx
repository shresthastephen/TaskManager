import { cn } from "../lib/utils";

interface DueDateBadgeProps {
  dueDate: string;
  status: 'pending' | 'done';
}

export function getDueDateStatus(dueDate: string, status: 'pending' | 'done'): 'overdue' | 'soon' | 'normal' | 'completed' {
  if (status === 'done') return 'completed';
  
  const now = new Date();
  const due = new Date(dueDate);
  const diffMs = due.getTime() - now.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  
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
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        dateStatus === 'overdue' && 'bg-destructive/10 text-destructive',
        dateStatus === 'soon' && 'bg-warning/10 text-warning',
        dateStatus === 'normal' && 'bg-muted text-muted-foreground',
        dateStatus === 'completed' && 'bg-success/10 text-success'
      )}
    >
      {formattedDate}
    </span>
  );
}
