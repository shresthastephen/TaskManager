import { useState } from "react";
import Nav from "../components/Nav";
import TaskModal from "../pages/AddTask";
import type { Task } from "../services/types";

interface AddTaskControllerProps {
  onAddTask: (data: Omit<Task, "id" | "createdAt">) => void;
}

export default function AddTaskController({ onAddTask }: AddTaskControllerProps) {
  const [open, setOpen] = useState(false);

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleSave = async (data: Omit<Task, "id" | "createdAt">) => {
    console.log("Saved task:", data);
    onAddTask(data); // pass data back to TaskPage state
    setOpen(false);  // close modal after saving
  };

  return (
    <>
      <Nav onAddTask={handleAddClick} />
      <TaskModal
        open={open}
        onOpenChange={setOpen}
        onSave={handleSave}
      />
    </>
  );
}
