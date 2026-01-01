"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type SortMode = "creation-date" | "due-date" | "urgency";
type SortOrder = "asc" | "desc";

export default function TaskSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const currentSort = (searchParams.get("sort") || "creation-date") as SortMode;
  const currentOrder = (searchParams.get("order") || "desc") as SortOrder;

  const handleSortChange = (sort: SortMode) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    params.set("order", "desc");
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const handleOrderToggle = () => {
    const params = new URLSearchParams(searchParams);
    const newOrder = currentOrder === "asc" ? "desc" : "asc";
    params.set("order", newOrder);
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const sorts: { label: string; value: SortMode }[] = [
    { label: "Creation Date", value: "creation-date" },
    { label: "Due Date", value: "due-date" },
    { label: "Urgency", value: "urgency" },
  ];

  return (
    <div
      className={`flex gap-2 items-center transition-opacity ${
        isPending ? "opacity-60" : "opacity-100"
      }`}
    >
      <div className="flex gap-2">
        {sorts.map((sort) => (
          <button
            key={sort.value}
            onClick={() => handleSortChange(sort.value)}
            disabled={isPending}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              currentSort === sort.value
                ? "bg-indigo-600 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            } ${isPending ? "cursor-not-allowed" : ""}`}
          >
            {sort.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleOrderToggle}
        disabled={isPending}
        className={`ml-2 px-2 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all ${
          isPending ? "cursor-not-allowed opacity-60" : ""
        }`}
        title={`Sort ${currentOrder === "asc" ? "descending" : "ascending"}`}
      >
        {currentOrder === "asc" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-sort-ascending"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l7 0" />
            <path d="M4 12l7 0" />
            <path d="M4 18l9 0" />
            <path d="M15 9l3 -3l3 3" />
            <path d="M18 6l0 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-sort-descending"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l9 0" />
            <path d="M4 12l7 0" />
            <path d="M4 18l7 0" />
            <path d="M15 15l3 3l3 -3" />
            <path d="M18 6l0 12" />
          </svg>
        )}
      </button>
    </div>
  );
}
