"use client";

import { useSearchParams } from "next/navigation";

interface TaskListTransitionProps {
  children: React.ReactNode;
  taskCount: number;
  isPending: boolean;
  loadingLabel: string;
}

export default function TaskListTransition({
  children,
  isPending,
  loadingLabel,
}: TaskListTransitionProps) {
  return (
    <div
      className={`w-[clamp(370px,100%,2400px)] max-w-[95vw] h-[clamp(600px,90vh,1500px)] space-y-3 transition-all duration-200 ${
        isPending
          ? "opacity-60 pointer-events-none"
          : "opacity-100 pointer-events-auto"
      }`}
    >
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="flex items-center gap-2 bg-(--bg-tertiary) px-4 py-2 rounded-lg border border-(--border-color)">
            <div className="animate-spin h-4 w-4 border-2 border-(--button-color) border-t-transparent rounded-full" />
            <span className="text-sm text-(--text-primary)">
              {loadingLabel}
            </span>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
