"use client";

import { useState, useEffect } from "react";
import type { FetchTasksParams } from "@/app/_lib/types/tasks";

interface TaskSearchBarProps {
  onSearchChange: (updates: FetchTasksParams) => void;
}

export default function TaskSearchBar({ onSearchChange }: TaskSearchBarProps) {
  const [term, setTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange({ search: term });
    }, 500);

    return () => clearTimeout(handler);
  }, [term, onSearchChange]);

  return (
    <div className="w-2xl">
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search tasks..."
        className="w-full bg-zinc-900 border-zinc-800 rounded-lg px-4 py-2 transition-all"
      />
    </div>
  );
}
