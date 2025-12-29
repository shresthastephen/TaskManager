import { useState } from 'react';
import { useTasks } from "../hooks/useTasks";
import type { Task } from "../services/types";
import TaskTable from "../components/TableData";
import { TaskFilters } from "../components/TaskFilters";
import { TaskModal } from '../components/TaskModal';
import { DeleteConfirmDialog } from '../components/DeleteConfirmDialog';
import { Plus, ClipboardList } from 'lucide-react';
import { useToast } from "../hooks/use-toast";

const Index = () => {
  const {
    tasks,
    loading,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    sort,
    toggleSort,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAddTask = () => {
    setSelectedTask(null);
    setModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleDeleteClick = (task: Task) => {
    setSelectedTask(task);
    setDeleteDialogOpen(true);
  };

  const handleSaveTask = async (data: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      if (selectedTask) {
        await updateTask(selectedTask.id, data);
        toast({
          title: 'Task updated',
          description: 'Your task has been updated successfully.',
        });
      } else {
        await createTask(data);
        toast({
          title: 'Task created',
          description: 'Your new task has been added.',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedTask) return;

    try {
      setIsDeleting(true);
      await deleteTask(selectedTask.id);
      toast({
        title: 'Task deleted',
        description: 'The task has been removed.',
      });
      setDeleteDialogOpen(false);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete task. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary p-2">
                <ClipboardList className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Task Tracker
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage your tasks efficiently
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddTask}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white font-medium text-primary-foreground hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="h-4 w-4" />
              Add Task
            </button>
          </div>
        </header>

        {/* Filters */}
        <section className="mb-6">
          <TaskFilters
            filter={filter}
            onFilterChange={setFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </section>

        {/* Task Table */}
        <main>
          <TaskTable
            tasks={tasks}
            sort={sort}
            onToggleSort={toggleSort}
            onEdit={handleEditTask}
            onDelete={handleDeleteClick}
            loading={loading}
          />
        </main>

        {/* Footer */}
        {!loading && (
          <footer className="mt-4 text-sm text-muted-foreground">
            Showing {tasks.length} task{tasks.length !== 1 ? 's' : ''}
          </footer>
        )}
      </div>

      {/* Modals */}
      <TaskModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        task={selectedTask}
        onSave={handleSaveTask}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        task={selectedTask}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default Index;
