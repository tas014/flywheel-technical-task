"use client";

import { useSearchParams } from "next/navigation";
import type { FetchTasksParams } from "@/app/_lib/types/tasks";

type FilterMode = "all" | "complete" | "pending";

interface TaskFilterProps {
  onFilterChange: (updates: Partial<FetchTasksParams>) => void;
}

export default function TaskFilter({ onFilterChange }: TaskFilterProps) {
  const searchParams = useSearchParams();
  const currentFilter = (searchParams.get("filter") || "all") as FilterMode;

  const handleFilterChange = (filter: FilterMode) => {
    onFilterChange({ filter });
  };

  const filters: { label: string; value: FilterMode }[] = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Complete", value: "complete" },
  ];

  return (
    <div className="flex gap-2 items-center">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => handleFilterChange(filter.value)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            currentFilter === filter.value
              ? "bg-indigo-600 text-white"
              : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
