"use client";

import { useTransition } from "react";
import { editTask, deleteTask } from "../../app/_lib/actions";
import type { Task } from "../../app/_lib/types/tasks";

export default function TaskItem({ data }: { data: Task }) {
  const { id, title, description, status, due_date } = data;
  const [isPending, startTransition] = useTransition();

  // Helper to format the date
  const formattedDate = due_date
    ? new Date(due_date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div
      className={`group relative flex items-start gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-700 transition-all ${
        isPending ? "opacity-50 grayscale" : "opacity-100"
      }`}
    >
      <div className="flex items-center h-6">
        <input
          type="checkbox"
          checked={status ?? false}
          disabled={isPending}
          onChange={(e) => {
            startTransition(() => editTask(id, e.target.checked));
          }}
          className="h-5 w-5 rounded border-zinc-700 bg-zinc-800 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-zinc-900 transition-colors cursor-pointer disabled:cursor-not-allowed"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3
            className={`text-sm font-medium transition-all truncate ${
              status ? "text-zinc-500 line-through" : "text-zinc-100"
            }`}
          >
            {title}
          </h3>

          {formattedDate && (
            <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
              {formattedDate}
            </span>
          )}
        </div>

        {description && (
          <p
            className={`mt-1 text-xs leading-relaxed line-clamp-2 ${
              status ? "text-zinc-600" : "text-zinc-400"
            }`}
          >
            {description}
          </p>
        )}
      </div>

      <button
        onClick={() => {
          if (confirm("Are you sure?")) {
            startTransition(() => deleteTask(id));
          }
        }}
        disabled={isPending}
        className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 text-zinc-500 hover:text-red-400 transition-all disabled:hidden"
        title="Delete task"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line x1="10" x2="10" y1="11" y2="17" />
          <line x1="14" x2="14" y1="11" y2="17" />
        </svg>
      </button>
    </div>
  );
}
