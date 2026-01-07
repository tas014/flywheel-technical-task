"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import type { FetchTasksParams } from "@/app/_lib/types/tasks";
import Search from "../UI/Icons/Search";

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
    <div className="h-12 flex-1 flex items-center gap-2 border-(--button-color) bg-(--button-color)/10 border-2 rounded-lg pl-4 transition-all">
      <Search />
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search tasks..."
        className="border-none w-full h-full :focus:border-none :focus:outline-none text-base"
      />
    </div>
  );
}
