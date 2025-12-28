import { useState, useMemo } from "react";
import FilterBar from "../components/FilterBar";
import TableData from "../components/TableData";
import AddTaskController from "../controller/AddTaskController";
import type { Task, TaskSort } from "../services/types";

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sort, setSort] = useState<TaskSort>({
    field: "title",
    direction: "asc",
  });

  // 🔹 ADD TASK
  const handleAddTask = (data: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...data,
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  // 🔹 SORT
  const handleToggleSort = (field: TaskSort["field"]) => {
    setSort((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  // 🔹 DELETE
  const handleDelete = (task: Task) => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  // 🔹 EDIT (next step)
  const handleEdit = (task: Task) => {
    console.log("Edit task:", task);
  };

  // 🔹 SORTED TASKS
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      const aVal = a[sort.field];
      const bVal = b[sort.field];

      if (aVal < bVal) return sort.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [tasks, sort]);

  return (
    <>
      <AddTaskController onAddTask={handleAddTask} />
      <FilterBar />

      <TableData
        tasks={sortedTasks}
        sort={sort}
        onToggleSort={handleToggleSort}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
}
