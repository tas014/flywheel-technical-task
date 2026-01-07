"use client";

import { useTransition, useState } from "react";
import { editTask } from "../../app/_lib/actions";
import DeleteButton from "./DeleteButton";
import type { Task } from "../../app/_lib/types/tasks";

interface TaskItemProps {
  data: Task;
  onError?: (message: string) => void;
  onTaskUpdate?: (task: Task) => void;
  onEditTask: (task: Task) => void;
}

export default function TaskItem({
  data,
  onError,
  onTaskUpdate,
  onEditTask,
}: TaskItemProps) {
  const { id, title, description, status, due_date } = data;
  const [, startTransition] = useTransition();
  const [optimisticStatus, setOptimisticStatus] = useState(status);
  const [isDeleted, setIsDeleted] = useState(false);

  if (isDeleted) return null;

  // Helper to format the date
  const formattedDate = due_date
    ? new Date(due_date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : null;

  const now = Date.now();
  const dueDateObj = due_date ? new Date(due_date) : null;
  const isOverdue = Boolean(
    !optimisticStatus && dueDateObj && dueDateObj.getTime() < now
  );
  const isDueSoon = Boolean(
    !optimisticStatus &&
      !isOverdue &&
      dueDateObj &&
      dueDateObj.getTime() < now + 48 * 60 * 60 * 1000
  );

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
    <div
      onClick={() => {
        onEditTask(data);
      }}
      className={`group relative flex items-start gap-4 p-4 rounded-xl border border-(--border-color) hover:border-(--border-color) transition-all cursor-pointer ${
        isOverdue
          ? "bg-(--overdue-task)/50 hover:bg-(--overdue-task)/80"
          : isDueSoon
          ? "bg-(--due-soon-task)/50 hover:bg-(--due-soon-task)/80"
          : "bg-(--background-soft)/50 hover:bg-(--background-soft)/80"
      }`}
    >
      <div
        className="flex items-center h-6"
        onClick={(e) => e.stopPropagation()}
      >
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
            className={`text-base md:text-lg font-bold transition-all truncate ${
              optimisticStatus
                ? "text-(--text-prim) line-through"
                : "text-(--text-primary)"
            }`}
          >
            {title} {isOverdue && "(Overdue)"}
            {isDueSoon && "(Due soon)"}
          </h3>

          {formattedDate && (
            <span className="text-xs font-medium uppercase tracking-wider text-(--text-secondary) bg-(--bg-tertiary) px-2 py-0.5 rounded">
              {formattedDate}
            </span>
          )}
        </div>

        {description && (
          <p
            className={`mt-1 text-sm leading-relaxed line-clamp-2 text-(--text-primary)`}
          >
            {description}
          </p>
        )}
      </div>

      <DeleteButton
        id={id}
        onDeleteStart={() => setIsDeleted(true)}
        onDeleteError={(error) => {
          setIsDeleted(false);
          onError?.(error);
        }}
      />
    </div>
  );
}
