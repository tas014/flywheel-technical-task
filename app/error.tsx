"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--background)">
      <div className="text-center px-6 max-w-md">
        <div className="mb-6 p-4 rounded-xl bg-(--bg-error)/20 border border-(--text-error) inline-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-(--text-error)"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold text-(--text-primary) mb-3">Something went wrong</h2>
        <p className="text-(--text-secondary) text-base mb-8">
          An unexpected error occurred. Please try again or contact support if the problem persists.
        </p>

        {error.message && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-(--text-secondary) hover:text-(--text-secondary) transition-colors">
              Error details
            </summary>
            <pre className="mt-3 p-3 bg-(--bg-tertiary) rounded border border-(--border-color) text-xs text-(--text-error) overflow-auto max-h-40">
              {error.message}
            </pre>
          </details>
        )}

        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-(--button-color) hover:bg-(--button-highlight) text-(--text-primary) font-semibold rounded-lg transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
