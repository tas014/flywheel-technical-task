import { SupabaseClient } from "@supabase/supabase-js";
import type { FetchTasksParams } from "./types/tasks";
import { filterTasks, sortTasks } from "./filter";

export function addURLParams(
  searchParams: URLSearchParams,
  updates: FetchTasksParams
): string {
  const params = new URLSearchParams(searchParams);

  if (updates.filter !== undefined) {
    params.set("filter", updates.filter);
  }
  if (updates.sort !== undefined) {
    if (updates.sort === "none") {
      params.delete("sort");
    } else {
      params.set("sort", updates.sort);
    }
  }
  if (updates.order !== undefined) {
    params.set("order", updates.order);
  }
  if (updates.search !== undefined) {
    if (updates.search) {
      params.set("search", updates.search);
    } else {
      params.delete("search");
    }
  }
  if (updates.view !== undefined) {
    params.set("view", updates.view);
  }

  return `?${params.toString()}`;
}

export async function fetchAndProcessTasks(
  supabase: SupabaseClient,
  params: FetchTasksParams
) {
  const filter = params.filter || "all";
  const sort = params.sort || "creation-date";
  const order = params.order || "desc";
  const search = params.search || "";

  // Build the database query
  let query = supabase.from("tasks").select("*");

  // Apply search filter to database query
  if (search) {
    query = query.or(`title.ilike.%${search}%`);
  }

  const { data: tasks, error: dbError } = await query;

  if (dbError || !tasks) {
    return {
      tasks: [],
      error: dbError,
    };
  }

  // Apply client-side filters and sorting
  let processedTasks = filterTasks(tasks, filter);
  processedTasks = sortTasks(processedTasks, sort, order);

  return {
    tasks: processedTasks,
    error: null,
  };
}
