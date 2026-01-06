"use client";

import Link from "next/link";
import { login } from "../../_lib/actions";
import { useActionState } from "react";

export default function Login() {
  const [error, formAction, isPending] = useActionState(login, null);

  return (
    <div className="max-w-lg mx-auto p-6 bg-(--bg-translucent) rounded-lg text-(--text-primary) size-fit w-full">
      <h1 className="text-xl text-center font-semibold uppercase tracking-wider py-5 border-b border-(--border-color) mb-4">
        Login
      </h1>
      <form action={formAction} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@mail.yay"
            required
            disabled={isPending}
            className="text-base px-3 py-2 rounded-sm border border-(--border-color) disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            disabled={isPending}
            className="text-base px-3 py-2 rounded-sm border border-(--border-color) disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer w-full px-4 py-2 rounded-sm bg-(--button-color) text-(--button-text) font-medium hover:bg-(--button-highlight) hover:text-(--button-color) transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
        <Link href="/signup" className="text-sm text-center">
          Don't have an account?{" "}
          <span className="font-medium underline">Sign up</span>
        </Link>

        {error && (
          <div className="px-3 py-2 rounded-sm bg-(--bg-error)/20 border border-(--text-error) text-(--text-error) text-sm">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
