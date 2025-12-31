"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthData } from "./types/formData";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

type errorMessage = string;

export function login(formData: FormData): Promise<never | errorMessage> {
  const didLogin = new Promise<never | errorMessage>((res, rej) => {
    if (!supabaseUrl || !supabasePublishableKey)
      throw new Error("Supabase environment credentials are missing!");

    const supabase = createClient(supabaseUrl, supabasePublishableKey);

    // Extract data from the form
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    supabase.auth
      .signInWithPassword({
        email,
        password,
      })
      .then(() => {
        // Clear cache so app reflects logged-in state
        revalidatePath("/", "layout");
        res(redirect("/"));
      })
      .catch((err) => rej("There was an error logging in: " + err));
  });
  return didLogin;
}

export function signup(formData: AuthData): Promise<never | errorMessage> {
  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error("Supabase environment credentials are missing!");
  }
  const { email, password } = formData;
  const didSignup = new Promise<never | errorMessage>((res, rej) => {
    const supabase = createClient(supabaseUrl, supabasePublishableKey);
    supabase.auth
      .signUp({
        email,
        password,
      })
      .then(() => {
        revalidatePath("/", "layout");
        res(redirect("/"));
      })
      .catch((err) => rej("There was an error logging in: " + err));
  });
  return didSignup;
}

export function signOut(): Promise<never | errorMessage> {
  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error("Supabase environment credentials are missing!");
  }
  const didSignOut = new Promise<never | errorMessage>((res, rej) => {
    const supabase = createClient(supabaseUrl, supabasePublishableKey);
    supabase.auth
      .signOut()
      .then(() => {
        revalidatePath("/", "layout");
        res(redirect("/login"));
      })
      .catch((err) => rej("There was an error signing out :" + err));
  });
  return didSignOut;
}
