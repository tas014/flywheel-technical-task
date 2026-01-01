"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ComponentState } from "react";
import type { TaskInsert, TaskUpdate, TaskFormData } from "./types/tasks";
import { AuthFormData, ErrorMessage } from "./types/auth";

// Auth
// prevstate for useActionState compatibility
async function login(
  prevState: ComponentState,
  formData: FormData
): Promise<ErrorMessage> | never {
  const { email, password } = _getAuthFormData(formData);
  if (!email || !password) return "Missing user credentials";
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
  return redirect("/");
}

// prevstate for useActionState compatibility
async function signUp(
  prevState: ComponentState,
  formData: FormData
): Promise<ErrorMessage> | never {
  const { email, password, confirmPassword } = _getAuthFormData(formData);

  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }
  if (!email) return "User must have a valid email.";
  if (!password) return "User must have a valid password.";
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

// prevstate for useActionState compatibility
async function signOut(): Promise<ErrorMessage> | never {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) return error.message;
  revalidatePath("/", "layout");
  redirect("/login");
  //since redirect functions as an exception that next catches, don't try catch exceptions with a throw error
}

// CRUD
// prevstate for useActionState compatibility
async function createTask(prevState: ComponentState, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user }, // nested destructuring, very cool stuff!
  } = await supabase.auth.getUser();
  if (!user) return "Unauthorized operation.";

  const { title, description, due_date } = _getTaskFormData(formData);

  if (!title) return "Task needs a title";
  const newTask: TaskInsert = {
    user_id: user.id,
    title,
  };
  if (description) newTask.description = description;
  if (due_date) newTask.due_date = due_date;

  const { error } = await supabase.from("tasks").insert([newTask]);

  if (error) throw new Error(error.message);
  revalidatePath("/"); // Refresh task list
}

// Args made so that editTask(id, boolean) updates task status, and editTask(id, formData) updates multiple fields
async function editTask(id: number, toggleOrForm: FormData | boolean) {
  const supabase = await createClient();
  let updateData: TaskUpdate = {};
  if (typeof toggleOrForm === "boolean") {
    updateData.status = toggleOrForm;
  } else {
    const { title, description, status, due_date } =
      _getTaskFormData(toggleOrForm);
    if (!title) throw new Error("Task must have a title.");
    updateData = {
      title,
      description,
      status,
      due_date,
    };
  }

  const { error } = await supabase
    .from("tasks")
    .update(updateData)
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/");
}

async function deleteTask(id: number) {
  const supabase = await createClient();
  // ensure we delete only the selected task
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
}

function _getAuthFormData(formData: FormData): AuthFormData {
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  return {
    email: email ? email.toString() : null,
    password: password ? password.toString() : null,
    confirmPassword: confirmPassword ? confirmPassword.toString() : null,
  };
}

function _getTaskFormData(formData: FormData): TaskFormData {
  const title = formData.get("title");
  const description = formData.get("description");
  const due_date = formData.get("due_date");
  const status = formData.get("status");

  return {
    title: title ? title.toString() : null,
    description: description ? description.toString() : null,
    due_date: due_date
      ? new Date(due_date.toString() + "T23:59:59").toISOString()
      : null,
    status: status ? status === "true" : false,
  };
}

export { login, signUp, signOut, createTask, editTask, deleteTask };
