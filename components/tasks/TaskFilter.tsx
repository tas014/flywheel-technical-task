"use client";

import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Check from "../UI/Icons/Check";
import FilterSpark from "../UI/Icons/FilterSpark";
import Popover from "../shared/Popover";
import type { FetchTasksParams } from "@/app/_lib/types/tasks";
import { FilterMode } from "@/app/_lib/types/tasks";

interface TaskFilterProps {
  onFilterChange: (updates: FetchTasksParams) => void;
}

export default function TaskFilter({ onFilterChange }: TaskFilterProps) {
  const searchParams = useSearchParams();
  const currentFilter = (searchParams.get("filter") || "all") as FilterMode;
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleFilterSelect = (filter: FilterMode) => {
    onFilterChange({ filter });
    setIsOpen(false);
  };

  const filters: { label: string; value: FilterMode }[] = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Complete", value: "complete" },
  ];

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 text-(--text-primary) flex items-center justify-center rounded-lg cursor-pointer bg-(--button-color)/70 transition-all ${
          isOpen || currentFilter !== "all"
            ? "bg-(--button-highlight)"
            : "hover:bg-(--button-color)"
        }`}
        title="Filter tasks"
      >
        <FilterSpark />
      </button>

      {isOpen && (
        <Popover
          onClose={() => setIsOpen(false)}
          triggerRef={triggerRef}
          align="right"
          className="w-40"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-(--text-primary) px-2 py-1 uppercase tracking-wider">
              Filter By
            </span>
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleFilterSelect(filter.value)}
                className={`flex cursor-pointer items-center justify-between px-2 py-1.5 rounded-md text-sm transition-colors ${
                  currentFilter === filter.value
                    ? "text-(--text-primary) bg-(--button-highlight) font-medium"
                    : "text-(--text-secondary) hover:bg-(--button-color)/70"
                }`}
              >
                {filter.label}
                {currentFilter === filter.value && <Check />}
              </button>
            ))}
          </div>
        </Popover>
      )}
    </div>
  );
}
