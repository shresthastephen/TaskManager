import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Task, TaskStatus } from "../services/types";

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  dueDate: z.string().min(1, 'Due date is required'),
  status: z.enum(['pending', 'done']),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
  onSave: (data: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
}

export function TaskModal({
  open,
  onOpenChange,
  task,
  onSave,
}: TaskModalProps) {
  const isEditing = !!task;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      dueDate: new Date().toISOString().split('T')[0],
      status: 'pending',
    },
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        dueDate: task.dueDate.split('T')[0],
        status: task.status,
      });
    } else {
      reset({
        title: '',
        dueDate: new Date().toISOString().split('T')[0],
        status: 'pending',
      });
    }
  }, [task, reset]);

  const onSubmit = async (data: TaskFormData) => {
    await onSave({
      title: data.title,
      dueDate: new Date(data.dueDate).toISOString(),
      status: data.status as TaskStatus,
    });
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">
          {isEditing ? 'Edit Task' : 'Add New Task'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="mb-1 block text-sm font-medium">Title</label>
            <input
              {...register('title')}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="Enter task title"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Due Date */}
          <div>
            <label className="mb-1 block text-sm font-medium">Due Date</label>
            <input
              type="date"
              {...register('dueDate')}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            {errors.dueDate && (
              <p className="mt-1 text-xs text-red-600">
                {errors.dueDate.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="mb-1 block text-sm font-medium">Status</label>
            <select
              {...register('status')}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              <option value="pending">Pending</option>
              <option value="done">Done</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-xs text-red-600">
                {errors.status.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-md border px-4 py-2 text-sm hover:bg-gray-100"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting
                ? 'Saving...'
                : isEditing
                ? 'Save Changes'
                : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
