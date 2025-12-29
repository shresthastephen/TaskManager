// import type { Task } from '../services/types';
// import { DueDateBadge } from './DueDateBadge';
// import { Pencil, Trash2 } from 'lucide-react';
// import { cn } from "../lib/utils";

// interface TaskRowProps {
//   task: Task;
//   onEdit: (task: Task) => void;
//   onDelete: (task: Task) => void;
// }

// export function TaskRow({ task, onEdit, onDelete }: TaskRowProps) {
//   return (
//     <tr className="border-b border-gray-200 transition-colors hover:bg-gray-50">
//       {/* Title */}
//       <td className="px-6 py-4">
//         <span
//           className={cn(
//             'font-medium text-gray-900',
//             task.status === 'done' && 'text-gray-400 line-through'
//           )}
//         >
//           {task.title}
//         </span>
//       </td>

//       {/* Due date */}
//       <td className="px-6 py-4">
//         <DueDateBadge dueDate={task.dueDate} status={task.status} />
//       </td>

//       {/* Status */}
//       <td className="px-6 py-4">
//         <span
//           className={cn(
//             'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
//             task.status === 'done'
//               ? 'bg-green-600 text-white'
//               : 'bg-gray-200 text-gray-700'
//           )}
//         >
//           {task.status === 'done' ? 'Done' : 'Pending'}
//         </span>
//       </td>

//       {/* Actions */}
//       <td className="px-6 py-4">
//         <div className="flex items-center gap-2">
//           <button
//             type="button"
//             onClick={() => onEdit(task)}
//             className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
//             aria-label="Edit task"
//           >
//             <Pencil className="h-4 w-4" />
//           </button>

//           <button
//             type="button"
//             onClick={() => onDelete(task)}
//             className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50"
//             aria-label="Delete task"
//           >
//             <Trash2 className="h-4 w-4" />
//           </button>
//         </div>
//       </td>
//     </tr>
//   );
// }
