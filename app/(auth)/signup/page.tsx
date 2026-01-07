"use client";

import Link from "next/link";
import { signUp } from "../../_lib/actions";
import { useActionState } from "react";

export default function Signup() {
  const [error, formAction, isPending] = useActionState(signUp, null);

  return (
    <div className="max-w-lg mx-auto p-6 bg-(--bg-translucent) rounded-lg text-(--text-primary) size-fit w-full">
      <h1 className="text-xl text-center font-semibold uppercase tracking-wider py-5 border-b border-(--border-color) mb-4">
        Signup
      </h1>
      <form action={formAction} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-medium text-lg" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="text-base px-3 py-2 rounded-sm border border-(--border-color) disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-lg" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="text-base px-3 py-2 rounded-sm border border-(--border-color) disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-lg" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
            className="text-base px-3 py-2 rounded-sm border border-(--border-color) disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer w-full px-4 py-2 rounded-sm bg-(--button-color) text-(--text-primary) font-medium hover:bg-(--button-highlight) transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Creating account..." : "Signup"}
        </button>
        <Link href="/login" className="text-lg text-center">
          Already have an account?{" "}
          <span className="font-medium underline">Login</span>
        </Link>

        {error && (
          <div className="px-3 py-2 rounded-sm bg-(--bg-error)/20 border border-(--text-error) text-(--text-error) text-sm">
            Error: {error}
          </div>
        )}
      </form>
    </div>
  );
}
