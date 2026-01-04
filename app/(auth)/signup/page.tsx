"use client";

import { signUp } from "../../_lib/actions";
import { useActionState } from "react";

export default function Signup() {
  const [error, formAction, isPending] = useActionState(signUp, null);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-(--bg-secondary) rounded-lg border border-(--border-color)">
      <h1 className="text-2xl font-bold mb-6">Signup</h1>
      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full bg-(--bg-tertiary) border border-(--border-color) rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full bg-(--bg-tertiary) border border-(--border-color) rounded px-3 py-2"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="confirmPassword"
          >
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
            className="w-full bg-(--bg-tertiary) border border-(--border-color) rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-(--button-color) text-(--text-primary) font-bold py-2 rounded hover:bg-(--button-highlight) disabled:opacity-50 transition-colors"
        >
          {isPending ? "Creating account..." : "Signup"}
        </button>

        {/* 3. Display the error returned from the server action */}
        {error && (
          <span className="text-(--text-error) text-sm block mt-2">
            Error: {error}
          </span>
        )}
      </form>
    </div>
  );
}
