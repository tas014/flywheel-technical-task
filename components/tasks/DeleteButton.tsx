"use client";

import { useTransition } from "react";
import { deleteTask } from "../../app/_lib/actions";

interface DeleteButtonProps {
  id: number;
  onDeleteStart?: () => void;
  onDeleteError?: (error: string) => void;
}

export default function DeleteButton({
  id,
  onDeleteStart,
  onDeleteError,
}: DeleteButtonProps) {
  const [, startTransition] = useTransition();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (confirm("Are you sure?")) {
          onDeleteStart?.();
          startTransition(async () => {
            const result = await deleteTask(id);
            if (result !== "success") {
              onDeleteError?.(result || "Failed to delete task");
            }
          });
        }
      }}
      className="lg:opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 bg-red-900 text-white hover:bg-(--text-error) cursor-pointer rounded transition-all"
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
  );
}
