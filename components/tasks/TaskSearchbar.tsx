"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { FetchTasksParams } from "@/app/_lib/types/tasks";

interface TaskSearchBarProps {
  onSearchChange: (updates: Partial<FetchTasksParams>) => void;
}

export default function TaskSearchBar({ onSearchChange }: TaskSearchBarProps) {
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange({ search: term });
    }, 500);

    return () => clearTimeout(handler);
  }, [term, onSearchChange]);

  return (
    <div className="relative">
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search tasks..."
        className="w-full bg-zinc-900 border-zinc-800 rounded-lg px-4 py-2 transition-all"
      />
    </div>
  );
}
