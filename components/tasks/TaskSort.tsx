"use client";

import { useSearchParams } from "next/navigation";
import SortDescending from "../UI/Icons/SortDescending";
import SortAscending from "../UI/Icons/SortAscending";
import Check from "../UI/Icons/Check";
import type { FetchTasksParams } from "@/app/_lib/types/tasks";

type SortMode = "none" | "creation-date" | "due-date" | "urgency";
type SortOrder = "asc" | "desc";

interface TaskSortProps {
  onParamsChange: (updates: FetchTasksParams) => void;
}

export default function TaskSort({ onParamsChange }: TaskSortProps) {
  const searchParams = useSearchParams();
  const currentSort = (searchParams.get("sort") || "none") as SortMode;
  const currentOrder = (searchParams.get("order") || "desc") as SortOrder;

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value as SortMode;
    onParamsChange({ sort, order: "desc" });
  };

  const handleOrderToggle = () => {
    const newOrder = currentOrder === "asc" ? "desc" : "asc";
    onParamsChange({ order: newOrder });
  };

  const sorts: { label: string; value: SortMode }[] = [
    { label: "None", value: "none" },
    { label: "Creation Date", value: "creation-date" },
    { label: "Due Date", value: "due-date" },
    { label: "Urgency", value: "urgency" },
  ];

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <span>Sort by: </span>
        <select
          value={currentSort}
          onChange={handleSortChange}
          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all appearance-none cursor-pointer"
        >
          {sorts.map((sort) => (
            <option key={sort.value} value={sort.value}>
              {sort.label}
            </option>
          ))}
        </select>
        {currentSort !== "none" && <Check />}
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
