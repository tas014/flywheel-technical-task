"use client";

import { useTransition, useState } from "react";
import { editTask, deleteTask } from "../../app/_lib/actions";
import type { Task } from "../../app/_lib/types/tasks";

interface TaskItemProps {
  data: Task;
  onError?: (message: string) => void;
  onTaskUpdate?: (task: Task) => void;
}

export default function TaskItem({ data, onError, onTaskUpdate }: TaskItemProps) {
  const { id, title, description, status, due_date } = data;
  const [, startTransition] = useTransition();
  const [optimisticStatus, setOptimisticStatus] = useState(status);

  // Helper to format the date
  const formattedDate = due_date
    ? new Date(due_date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : null;

  const handleStatusChange = (newStatus: boolean) => {
    // Optimistically update UI locally
    setOptimisticStatus(newStatus);

    // Update parent state immediately for instant transition
    const updatedTask: Task = { ...data, status: newStatus };
    onTaskUpdate?.(updatedTask);

    startTransition(async () => {
      const result = await editTask(id, newStatus);
      
      // If there's an error, revert the optimistic update
      if (result !== "success") {
        setOptimisticStatus(status);
        const revertedTask: Task = { ...data, status };
        onTaskUpdate?.(revertedTask);
        onError?.(result || "Failed to update task");
      }
    });
  };

  return (
    <div className="group relative flex items-start gap-4 p-4 rounded-xl border border-(--border-color) bg-(--bg-tertiary)/50 hover:bg-(--bg-tertiary) hover:border-(--border-color) transition-all">
      <div className="flex items-center h-6">
        <input
          type="checkbox"
          checked={optimisticStatus ?? false}
          onChange={(e) => {
            handleStatusChange(e.target.checked);
          }}
          className="h-5 w-5 rounded border-(--border-color) bg-(--bg-tertiary) text-(--button-color) focus:ring-indigo-500 focus:ring-offset-zinc-900 transition-colors cursor-pointer"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3
            className={`text-sm font-medium transition-all truncate ${
              optimisticStatus ? "text-(--text-secondary) line-through" : "text-(--text-primary)"
            }`}
          >
            {title}
          </h3>

          {formattedDate && (
            <span className="text-[10px] font-medium uppercase tracking-wider text-(--text-secondary) bg-(--bg-tertiary) px-2 py-0.5 rounded">
              {formattedDate}
            </span>
          )}
        </div>

        {description && (
          <p
            className={`mt-1 text-xs leading-relaxed line-clamp-2 ${
              optimisticStatus ? "text-(--text-tertiary)" : "text-(--text-secondary)"
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
        className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 bg-(--button-color) hover:bg-(--button-highlight) rounded transition-all"
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
