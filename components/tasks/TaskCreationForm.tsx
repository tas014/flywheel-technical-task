"use client";

import { ComponentState, useActionState } from "react";
import { createTask } from "../../app/_lib/actions";

export default function TaskCreationForm() {
  const actionHandler = async (
    prevState: ComponentState, // unused parameter for useActionState compatibility
    formData: FormData
  ) => {
    return await createTask(prevState, formData);
  };
  const [state, formAction, isPending] = useActionState(actionHandler, null);
  return (
    <div className="mb-12">
      <h3 className="text-sm font-semibold text-(--text-secondary) uppercase tracking-wider mb-4">
        New Task
      </h3>

      <form
        action={formAction}
        className="flex flex-col gap-4 p-4 rounded-xl border border-(--border-color) bg-(--bg-tertiary)/50"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-medium text-(--text-secondary)">
            Task Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            disabled={isPending}
            placeholder="Enter task title"
            required
            className="px-3 py-2 rounded-lg border border-(--border-color) bg-(--bg-tertiary) text-(--text-primary) placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-(--text-secondary)"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            disabled={isPending}
            placeholder="Enter task description (optional)"
            rows={3}
            className="px-3 py-2 rounded-lg border border-(--border-color) bg-(--bg-tertiary) text-(--text-primary) placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="due_date"
            className="text-sm font-medium text-(--text-secondary)"
          >
            Due Date
          </label>
          <input
            id="due_date"
            type="date"
            name="due_date"
            disabled={isPending}
            className="px-3 py-2 rounded-lg border border-(--border-color) bg-(--bg-tertiary) text-(--text-primary) focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="status"
            type="checkbox"
            name="status"
            disabled={isPending}
            className="h-4 w-4 rounded border-(--border-color) bg-(--bg-tertiary) text-(--button-color) focus:ring-indigo-500 focus:ring-offset-zinc-900 transition-colors cursor-pointer disabled:cursor-not-allowed"
          />
          <label htmlFor="status" className="text-sm font-medium text-(--text-secondary)">
            Mark as completed
          </label>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 rounded-lg bg-(--button-color) text-(--text-primary) font-medium hover:bg-(--button-highlight) focus:outline-none focus:ring-2 focus:ring-offset-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Creating..." : "Create Task"}
        </button>
      </form>
      {state && state !== "success" && (
          <div className="px-3 py-2 rounded-lg bg-(--bg-error)/20 border border-(--text-error) text-(--text-error) text-sm">
            {state}
          </div>
        )}
      {state === "success" && (
        <div className="px-3 py-2 rounded-lg bg-(--bg-success)/20 border border-(--text-success) text-(--text-success) text-sm">
          Task created successfully!
        </div>
      )}
    </div>
  );
}
