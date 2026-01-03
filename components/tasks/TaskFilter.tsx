"use client";

import { useSearchParams } from "next/navigation";
import Check from "../UI/Icons/Check";
import type { FetchTasksParams } from "@/app/_lib/types/tasks";
import { FilterMode } from "@/app/_lib/types/tasks";

interface TaskFilterProps {
  onFilterChange: (updates: FetchTasksParams) => void;
}

export default function TaskFilter({ onFilterChange }: TaskFilterProps) {
  const searchParams = useSearchParams();
  // no need for effect and state since the page will update on URL change
  const currentFilter = (searchParams.get("filter") || "none") as FilterMode;

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.value as FilterMode;
    onFilterChange({ filter });
  };

  const filters: { label: string; value: FilterMode }[] = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Complete", value: "complete" },
  ];

  return (
    <div className="flex items-center gap-2">
      <span>Filter: </span>
      <select
        value={currentFilter}
        onChange={handleFilterChange}
        className="px-3 py-1.5 rounded-lg text-sm font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all appearance-none cursor-pointer"
      >
        {filters.map((filter) => (
          <option key={filter.value} value={filter.value}>
            {filter.label}
          </option>
        ))}
      </select>
      <Check />
    </div>
  );
}
