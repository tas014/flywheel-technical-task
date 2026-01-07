"use client";

import Link from "next/link";
import { login } from "../../_lib/actions";
import { useActionState } from "react";

export default function Login() {
  const [error, formAction, isPending] = useActionState(login, null);

  return (
    <div className="max-w-lg w-9/10 p-6 bg-(--bg-translucent) rounded-md text-(--text-primary) landscape:flex lg:!block">
      <h1 className="text-xl text-center font-semibold uppercase tracking-wider py-5 border-b landscape:border-r landscape:border-b-0 border-(--border-color) mb-4 landscape:flex landscape:justify-center landscape:items-center landscape:pr-6 landscape:mr-6 lg:!border-b lg:!border-r-0 lg:!mb-4 lg:!block lg:!pr-0 lg:!mr-0">
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
          className="cursor-pointer w-full px-4 py-2 rounded-sm bg-(--button-color) text-(--text-primary) font-medium hover:bg-(--button-highlight) transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
