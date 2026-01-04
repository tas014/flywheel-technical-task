"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import type { FetchTasksParams } from "@/app/_lib/types/tasks";

interface TaskSearchBarProps {
  onSearchChange: (updates: FetchTasksParams) => void;
}

export default function TaskSearchBar({ onSearchChange }: TaskSearchBarProps) {
  const searchParams = useSearchParams();
  // Start the state as the server provided params to prevent a pointless re-fetch on the useEffect call
  const [term, setTerm] = useState(searchParams.get("search") || "");
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

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
