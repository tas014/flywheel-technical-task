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
    <div className="text-(--text-primary)">
      <h3 className="text-xl text-center font-semibold uppercase tracking-wider py-5 border-b border-(--border-color) mb-4">
        New Task
      </h3>

      <form action={formAction} className="flex flex-col gap-6 p-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-medium">
            Task Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            disabled={isPending}
            placeholder="Enter task title"
            required
            className="text-base px-3 py-2 rounded-sm border border-(--border-color) disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            disabled={isPending}
            placeholder="Enter task description (optional)"
            rows={3}
            className="min-h-[200px] text-base px-3 py-2 rounded-sm border border-(--border-color) disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="due_date" className="font-medium">
            Due Date
          </label>
          <input
            id="due_date"
            type="date"
            name="due_date"
            disabled={isPending}
            className="text-base px-3 py-2 rounded-sm border border-(--border-color) disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="status"
            type="checkbox"
            name="status"
            disabled={isPending}
            className="text-base h-4 w-4 rounded border-(--border-color) text-(--button-color) focus:ring-indigo-500 focus:ring-offset-zinc-900 transition-colors cursor-pointer disabled:cursor-not-allowed"
          />
          <label htmlFor="status" className="text-base font-medium">
            Mark as completed
          </label>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer px-4 py-2 rounded-sm bg-(--button-color) text-(--button-text) font-medium hover:bg-(--button-highlight) hover:text-(--button-color) transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Creating..." : "Create Task"}
        </button>
      </form>
      {state && state !== "success" && (
        <div className="px-3 py-2 rounded-sm bg-(--bg-error)/20 border border-(--text-error) text-(--text-error) text-sm">
          {state}
        </div>
      )}
    </div>
  );
}
