"use client";

import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import SortDescending from "../UI/Icons/SortDescending";
import SortAscending from "../UI/Icons/SortAscending";
import Check from "../UI/Icons/Check";
import Popover from "../shared/Popover";
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
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleSortSelect = (sort: SortMode) => {
    onParamsChange({ sort });
    // Keep open or close? Usually close if strict selection.
    setIsOpen(false);
  };

  const handleOrderSelect = (order: SortOrder) => {
    onParamsChange({ order });
    setIsOpen(false);
  };

  const sorts: { label: string; value: SortMode }[] = [
    { label: "Default", value: "none" },
    { label: "Creation Date", value: "creation-date" },
    { label: "Due Date", value: "due-date" },
    { label: "Urgency", value: "urgency" },
  ];

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 text-(--text-primary) flex items-center justify-center rounded-lg cursor-pointer transition-all border border-(--button-color) border-2 ${
          isOpen ? "bg-(--button-highlight)" : "hover:bg-(--button-color)/70"
        }`}
        title={`Sort by ${currentSort} (${currentOrder})`}
      >
        {currentOrder === "asc" ? <SortDescending /> : <SortAscending />}
      </button>

      {isOpen && (
        <Popover
          onClose={() => setIsOpen(false)}
          triggerRef={triggerRef}
          className="w-48"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-(--text-primary) px-2 py-1 uppercase tracking-wider">
              Sort By
            </span>
            {sorts.map((sort) => (
              <button
                key={sort.value}
                onClick={() => handleSortSelect(sort.value)}
                className={`flex cursor-pointer items-center justify-between px-2 py-1.5 rounded-md text-sm transition-colors ${
                  currentSort === sort.value
                    ? "text-(--text-primary) bg-(--button-highlight) font-medium"
                    : "text-(--text-secondary) hover:bg-(--button-color)/70"
                }`}
              >
                {sort.label}
                {currentSort === sort.value && <Check />}
              </button>
            ))}

            <div className="my-1 border-t border-(--border-color)" />

            <span className="text-(--text-primary) text-xs font-semibold px-2 py-1 uppercase tracking-wider">
              Order
            </span>
            <button
              onClick={() => handleOrderSelect("desc")}
              className={`flex cursor-pointer items-center justify-between px-2 py-1.5 rounded-md text-sm transition-colors ${
                currentOrder === "desc"
                  ? "text-(--text-primary) bg-(--button-highlight) font-medium"
                  : "text-(--text-secondary) hover:bg-(--button-color)/70"
              }`}
            >
              Ascending
              {currentOrder === "desc" && <Check />}
            </button>
            <button
              onClick={() => handleOrderSelect("asc")}
              className={`flex cursor-pointer items-center justify-between px-2 py-1.5 rounded-md text-sm transition-colors ${
                currentOrder === "asc"
                  ? "text-(--text-primary) bg-(--button-highlight) font-medium"
                  : "text-(--text-secondary) hover:bg-(--button-color)/70"
              }`}
            >
              Descending
              {currentOrder === "asc" && <Check />}
            </button>
          </div>
        </Popover>
      )}
    </div>
  );
}
