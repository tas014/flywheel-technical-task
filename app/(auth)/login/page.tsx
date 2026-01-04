"use client";

import { login } from "../../_lib/actions";
import { useActionState } from "react";

export default function Login() {
  const [error, formAction, isPending] = useActionState(login, null);

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@mail.yay"
            required
            disabled={isPending}
            className="w-full p-2 border rounded bg-transparent disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            disabled={isPending}
            className="w-full p-2 border rounded bg-transparent disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-(--button-color) text-(--text-primary) py-2 rounded hover:bg-(--button-highlight) disabled:opacity-50 transition-colors"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

        {error && (
          <div className="p-3 text-sm text-(--text-error) bg-(--bg-error)/10 border border-(--text-error)/20 rounded">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
