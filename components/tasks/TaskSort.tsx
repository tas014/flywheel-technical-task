"use client";

import { useSearchParams } from "next/navigation";
import SortDescending from "../UI/Icons/SortDescending";
import SortAscending from "../UI/Icons/SortAscending";
import type { FetchTasksParams } from "@/app/_lib/types/tasks";

type SortMode = "creation-date" | "due-date" | "urgency";
type SortOrder = "asc" | "desc";

interface TaskSortProps {
  onParamsChange: (updates: Partial<FetchTasksParams>) => void;
}

export default function TaskSort({ onParamsChange }: TaskSortProps) {
  const searchParams = useSearchParams();
  const currentSort = (searchParams.get("sort") || "creation-date") as SortMode;
  const currentOrder = (searchParams.get("order") || "desc") as SortOrder;

  const handleSortChange = (sort: SortMode) => {
    onParamsChange({ sort, order: "desc" });
  };

  const handleOrderToggle = () => {
    const newOrder = currentOrder === "asc" ? "desc" : "asc";
    onParamsChange({ order: newOrder });
  };

  const sorts: { label: string; value: SortMode }[] = [
    { label: "Creation Date", value: "creation-date" },
    { label: "Due Date", value: "due-date" },
    { label: "Urgency", value: "urgency" },
  ];

  return (
    <div className="flex gap-2 items-center">
      <div className="flex gap-2">
        {sorts.map((sort) => (
          <button
            key={sort.value}
            onClick={() => handleSortChange(sort.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              currentSort === sort.value
                ? "bg-indigo-600 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {sort.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleOrderToggle}
        className="ml-2 px-2 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all"
        title={`Sort ${currentOrder === "asc" ? "descending" : "ascending"}`}
      >
        {currentOrder === "asc" ? <SortAscending /> : <SortDescending />}
      </button>
    </div>
  );
}
