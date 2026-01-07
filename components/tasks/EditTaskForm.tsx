"use client";

import { ComponentState, useActionState } from "react";
import { editTask } from "@/app/_lib/actions";
import type { Task } from "@/app/_lib/types/tasks";

interface EditTaskFormProps {
  task: Task;
}

export default function EditTaskForm({ task }: EditTaskFormProps) {
  const actionHandler = async (
    prevState: ComponentState, // unused parameter for useActionState compatibility
    formData: FormData
  ) => {
    return await editTask(task.id, formData);
  };
  const [state, formAction, isPending] = useActionState(actionHandler, null);

  // Format date for input: YYYY-MM-DD
  const formatDateForInput = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="text-(--text-primary)">
      <h3 className="text-3xl text-center font-semibold uppercase tracking-wider py-6 border-b border-(--border-color) mb-4">
        Edit Task
      </h3>
      <div>
        <form
          action={formAction}
          className="grid grid-cols-1 landscape:grid-cols-2 gap-6 p-4 landscape:p-0 lg:p-4 items-start"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-base font-medium">
              Task Details
            </label>
            <input
              id="title"
              type="text"
              name="title"
              disabled={isPending}
              defaultValue={task.title}
              placeholder="Enter task title"
              required
              className="text-base px-3 py-2 rounded-sm border border-(--border-color) disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <textarea
              id="description"
              name="description"
              disabled={isPending}
              defaultValue={task.description || ""}
              placeholder="Enter task description (optional)"
              rows={3}
              className="min-h-[200px] text-base px-3 py-2 rounded-sm border border-(--border-color) disabled:opacity-50 disabled:cursor-not-allowed resize-none"
            />
          </div>
          <div className="flex flex-col gap-4 landscape:h-full justify-start lg:h-auto lg:justify-start">
            <div className="flex flex-col gap-2">
              <label htmlFor="due_date" className="text-base font-medium">
                Due Date
              </label>
              <input
                id="due_date"
                type="date"
                name="due_date"
                disabled={isPending}
                defaultValue={formatDateForInput(task.due_date)}
                className="text-base px-3 py-2 rounded-sm border border-(--border-color) disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="status"
                type="checkbox"
                name="status"
                disabled={isPending}
                defaultChecked={task.status}
                className="text-base h-4 w-4 rounded border-(--border-color) text-(--button-color) focus:ring-indigo-500 focus:ring-offset-zinc-900 transition-colors cursor-pointer disabled:cursor-not-allowed"
              />
              <label htmlFor="status" className="text-base font-medium">
                Mark as completed
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="cursor-pointer px-4 py-2 rounded-sm text-(--button-text) border border-(--button-color) font-medium hover:bg-(--button-highlight) hover:text-(--text-primary) transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
            {state && state !== "success" && (
              <div className="px-3 py-2 flex justify-center items-center rounded-sm bg-(--bg-error)/20 border border-(--text-error) text-(--text-error) text-sm grow">
                {state}
              </div>
            )}
            {state === "success" && (
              <div className="px-3 py-2 flex justify-center items-center rounded-sm bg-(--button-highlight)/70 border border-(--button-color) text-(--button-text) text-sm grow">
                Task updated successfully!
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
