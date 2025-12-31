"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { type ComponentState } from "react";

// 1. Signature: (prevState, formData)
// This allows useActionState to track the return value
export async function login(prevState: ComponentState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Use the SSR client that handles cookies automatically
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return error.message; // Resolves as the 'state' in your component
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(prevState: ComponentState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return error.message;
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/login");
}
