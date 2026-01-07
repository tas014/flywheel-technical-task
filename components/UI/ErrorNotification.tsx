import React from "react";

interface ErrorNotificationProps {
  errorMessage: string;
  setErrorMessage: (message: string | null) => void;
}

export default function ErrorNotification({
  errorMessage,
  setErrorMessage,
}: ErrorNotificationProps) {
  return (
    // make it stick to the bottom of the screen centered
    <div className="mb-4 p-4 bottom-0 fixed left-1/2 transform -translate-x-1/2 max-w-lg rounded-lg bg-(--bg-error)/20 border border-(--text-error)">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-(--text-error) flex-shrink-0 mt-0.5"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-(--text-error) text-sm">{errorMessage}</p>
        </div>
        <button
          onClick={() => setErrorMessage(null)}
          className="flex-shrink-0 text-(--text-error) hover:opacity-70 transition-opacity font-bold text-lg leading-none p-0 w-6 h-6 flex items-center justify-center"
          title="Close error notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}
