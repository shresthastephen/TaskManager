import type { Task, TaskSort } from "../services/types";
import { DueDateBadge } from "./DueDateBadge";
import {
  Pencil,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { cn } from "../lib/utils";

interface TableDataProps {
  tasks: Task[];
  sort: TaskSort;
  onToggleSort: (field: TaskSort["field"]) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  loading?: boolean;
}

function SortIcon({
  field,
  sort,
}: {
  field: TaskSort["field"];
  sort: TaskSort;
}) {
  if (sort.field !== field) {
    return <ArrowUpDown className="ml-1 h-4 w-4 text-muted-foreground" />;
  }

  return sort.direction === "asc" ? (
    <ArrowUp className="ml-1 h-4 w-4 text-primary" />
  ) : (
    <ArrowDown className="ml-1 h-4 w-4 text-primary" />
  );
}

export default function TableData({
  tasks,
  sort,
  onToggleSort,
  onEdit,
  onDelete,
  loading,
}: TableDataProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <p className="text-lg font-medium">No tasks found</p>
        <p className="text-sm">Try adjusting filters or add a task</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full">
        {/* TABLE HEAD */}
        <thead className="bg-muted/50">
          <tr>
            <th className="px-6 py-3 text-left">
              <button
                onClick={() => onToggleSort("title")}
                className={cn(
                  "flex items-center gap-1 text-xs font-semibold uppercase tracking-wider -ml-1",
                  sort.field === "title" && "text-primary"
                )}
              >
                Title
                <SortIcon field="title" sort={sort} />
              </button>
            </th>

            <th className="px-6 py-3 text-left">
              <button
                onClick={() => onToggleSort("dueDate")}
                className={cn(
                  "flex items-center gap-1 text-xs font-semibold uppercase tracking-wider -ml-1",
                  sort.field === "dueDate" && "text-primary"
                )}
              >
                Due Date
                <SortIcon field="dueDate" sort={sort} />
              </button>
            </th>

            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Status
            </th>

            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="border-b border-border transition-colors hover:bg-muted/50"
            >
              {/* Title */}
              <td className="px-6 py-4">
                <span
                  className={cn(
                    "font-medium text-foreground",
                    task.status === "done" &&
                      "line-through text-muted-foreground"
                  )}
                >
                  {task.title}
                </span>
              </td>

              {/* Due Date */}
              <td className="px-6 py-4">
                <DueDateBadge
                  dueDate={task.dueDate}
                  status={task.status}
                />
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                <span
                  className={cn(
                    "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                    task.status === "done" &&
                      "bg-green-100 text-green-700",
                    task.status === "pending" &&
                      "bg-yellow-100 text-yellow-700"
                  )}
                >
                  {task.status === "done" ? "Done" : "Pending"}
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(task)}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => onDelete(task)}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
