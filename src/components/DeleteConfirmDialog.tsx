import type { Task } from "../services/types";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
  onConfirm: () => Promise<void>;
  isDeleting?: boolean;
}

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  task,
  onConfirm,
  isDeleting,
}: DeleteConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold">Delete Task</h2>

        <p className="mt-2 text-sm text-gray-600">
          Are you sure you want to delete{' '}
          <span className="font-medium">"{task?.title}"</span>?  
          This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
            className="rounded-md border px-4 py-2 text-sm hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
