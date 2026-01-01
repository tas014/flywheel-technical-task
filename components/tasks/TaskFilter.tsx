"use client";

import { useRouter, useSearchParams } from "next/navigation";

type FilterMode = "all" | "complete" | "pending";

export default function TaskFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = (searchParams.get("filter") || "all") as FilterMode;

  const handleFilterChange = (filter: FilterMode) => {
    const params = new URLSearchParams(searchParams);
    params.set("filter", filter);
    router.push(`?${params.toString()}`);
  };

  const filters: { label: string; value: FilterMode }[] = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Complete", value: "complete" },
  ];

  return (
    <div className="flex gap-2 mb-4">
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
