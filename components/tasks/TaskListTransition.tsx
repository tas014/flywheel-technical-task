"use client";

import { useSearchParams } from "next/navigation";

interface TaskListTransitionProps {
  children: React.ReactNode;
  taskCount: number;
  isPending: boolean;
}

export default function TaskListTransition({
  children,
  isPending,
}: TaskListTransitionProps) {
  const searchParams = useSearchParams();

  const hasActiveFilters =
    searchParams.get("filter") !== "all" && searchParams.get("filter") !== null;
  const hasSearch = searchParams.has("search");
  const hasCustomSort = searchParams.get("sort") !== "creation-date";

  return (
    <div
      className={`space-y-3 transition-all duration-200 ${
        isPending
          ? "opacity-60 pointer-events-none"
          : "opacity-100 pointer-events-auto"
      }`}
    >
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="flex items-center gap-2 bg-(--bg-tertiary) px-4 py-2 rounded-lg border border-(--border-color)">
            <div className="animate-spin h-4 w-4 border-2 border-(--button-color) border-t-transparent rounded-full" />
            <span className="text-sm text-(--text-secondary)">
              {hasSearch
                ? "Searching..."
                : hasActiveFilters
                ? "Filtering..."
                : hasCustomSort
                ? "Sorting..."
                : "Loading..."}
            </span>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
