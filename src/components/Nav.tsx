import { ClipboardList, Plus } from "lucide-react";

interface NavProps {
  onAddTask: () => void;
}

export default function Nav({ onAddTask }: NavProps) {
  return (
    <header className="mb-8 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary p-2 shadow-sm">
            <ClipboardList className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <h1 className="text-2xl font-bold text-foreground">
              Task Tracker
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your tasks efficiently
            </p>
          </div>
        </div>

        {/* Right: Add Task Button */}
        <button
          onClick={onAddTask}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </button>
      </div>
    </header>
  );
}
