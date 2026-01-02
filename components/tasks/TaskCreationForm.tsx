"use client";

import { useActionState } from "react";
import { createTask } from "../../app/_lib/actions";

export default function TaskCreationForm() {
  const [state, formAction, isPending] = useActionState(createTask, null);

  return (
    <section className="mb-12">
      <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
        New Task
      </h2>

      <form
        action={formAction}
        className="flex flex-col gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/50"
      >
        {state && (
          <div className="px-3 py-2 rounded-lg bg-red-900/20 border border-red-800 text-red-400 text-sm">
            {state}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-medium text-zinc-300">
            Task Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            disabled={isPending}
            placeholder="Enter task title"
            required
            className="px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-zinc-300"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            disabled={isPending}
            placeholder="Enter task description (optional)"
            rows={3}
            className="px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="due_date"
            className="text-sm font-medium text-zinc-300"
          >
            Due Date
          </label>
          <input
            id="due_date"
            type="date"
            name="due_date"
            disabled={isPending}
            className="px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="status"
            type="checkbox"
            name="status"
            disabled={isPending}
            className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-zinc-900 transition-colors cursor-pointer disabled:cursor-not-allowed"
          />
          <label htmlFor="status" className="text-sm font-medium text-zinc-300">
            Mark as completed
          </label>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Creating..." : "Create Task"}
        </button>
      </form>
    </section>
  );
}
