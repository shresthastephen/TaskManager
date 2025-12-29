// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import type { Task, TaskStatus } from "../services/types";

// interface TaskModalProps {
//   open: boolean;
//   onClose: () => void;
//   onSave: (data: Omit<Task, "id" | "createdAt">) => void;
//   task?: Task | null;
// }

// interface FormValues {
//   title: string;
//   dueDate: string;
//   status: TaskStatus;
// }

// export default function TaskModal({
//   open,
//   onClose,
//   onSave,
//   task,
// }: TaskModalProps) {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm<FormValues>({
//     defaultValues: {
//       title: "",
//       dueDate: new Date().toISOString().split("T")[0],
//       status: "pending",
//     },
//   });

//   const isEditing = Boolean(task);

//   useEffect(() => {
//     if (task) {
//       reset({
//         title: task.title,
//         dueDate: task.dueDate.split("T")[0],
//         status: task.status,
//       });
//     } else {
//       reset({
//         title: "",
//         dueDate: new Date().toISOString().split("T")[0],
//         status: "pending",
//       });
//     }
//   }, [task, reset]);

//   if (!open) return null;

//   const submitHandler = (data: FormValues) => {
//     onSave({
//       title: data.title,
//       dueDate: new Date(data.dueDate).toISOString(),
//       status: data.status,
//     });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//       <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
//         <h2 className="mb-4 text-xl font-semibold">
//           {isEditing ? "Edit Task" : "Add Task"}
//         </h2>

//         <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
//           {/* Title */}
//           <div>
//             <label className="block text-sm font-medium">Title</label>
//             <input
//               {...register("title", { required: "Title is required" })}
//               className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
//             />
//             {errors.title && (
//               <p className="mt-1 text-xs text-red-500">
//                 {errors.title.message}
//               </p>
//             )}
//           </div>

//           {/* Due Date */}
//           <div>
//             <label className="block text-sm font-medium">Due Date</label>
//             <input
//               type="date"
//               {...register("dueDate", { required: true })}
//               className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
//             />
//           </div>

//           {/* Status */}
//           <div>
//             <label className="block text-sm font-medium">Status</label>
//             <select
//               {...register("status")}
//               className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
//             >
//               <option value="pending">Pending</option>
//               <option value="done">Done</option>
//             </select>
//           </div>

//           {/* Actions */}
//           <div className="flex justify-end gap-2 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="rounded-md border px-4 py-2 text-sm"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="rounded-md bg-black px-4 py-2 text-sm text-white"
//             >
//               {isEditing ? "Save" : "Add"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
