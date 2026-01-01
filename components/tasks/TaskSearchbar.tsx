"use client";

import { useTransition, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function TaskSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [term, setTerm] = useState(searchParams.get("search") || "");

  useEffect(() => {
    // Debounce the URL update
    const handler = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (term) params.set("search", term);
      else params.delete("search");

      // Wrap in transition to keep UI responsive
      startTransition(() => {
        router.push(`?${params.toString()}`, { scroll: false });
      });
    }, 500);

    return () => clearTimeout(handler);
  }, [term, router]);

  return (
    <div className="relative">
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search tasks..."
        className={`w-full bg-zinc-900 border-zinc-800 rounded-lg px-4 py-2 transition-all ${
          isPending ? "opacity-70 ring-1 ring-indigo-500" : ""
        }`}
      />
      {isPending && (
        <div className="absolute right-3 top-2.5 animate-spin h-4 w-4 border-2 border-indigo-500 border-t-transparent rounded-full" />
      )}
    </div>
  );
}
