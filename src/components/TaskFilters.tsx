import type { TaskFilter } from "../services/types";
import { Search } from "lucide-react";
import { cn } from "../lib/utils";

interface TaskFiltersProps {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const filters: { value: TaskFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "done", label: "Done" },
];

export function TaskFilters({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      {/* Filter buttons */}
      <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => onFilterChange(f.value)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-colors",
              filter === f.value
                ? "bg-blue-600 text-white shadow"
                : "text-gray-500 hover:text-gray-900"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-md border border-black bg-white py-2 pl-10 pr-3 text-sm text-black outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
        />
      </div>
    </div>
  );
}
