"use client";

import { useRouter, useSearchParams } from "next/navigation";

type SortMode = "creation-date" | "due-date" | "urgency";
type SortOrder = "asc" | "desc";

export default function TaskSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = (searchParams.get("sort") || "creation-date") as SortMode;
  const currentOrder = (searchParams.get("order") || "desc") as SortOrder;

  const handleSortChange = (sort: SortMode) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    params.set("order", "desc");
    router.push(`?${params.toString()}`);
  };

  const handleOrderToggle = () => {
    const params = new URLSearchParams(searchParams);
    const newOrder = currentOrder === "asc" ? "desc" : "asc";
    params.set("order", newOrder);
    router.push(`?${params.toString()}`);
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
        {currentOrder === "asc" ? (
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
            <polyline points="12 5 19 12 12 19" />
            <polyline points="5 5 12 12 5 19" />
          </svg>
        ) : (
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
            <polyline points="12 19 5 12 12 5" />
            <polyline points="19 19 12 12 19 5" />
          </svg>
        )}
      </button>
    </div>
  );
}
