import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import TaskItem from "@/components/tasks/TaskItem";
import CreateTaskForm from "@/components/tasks/TaskCreationForm";
import TaskFilter from "@/components/tasks/TaskFilter";
import TaskSort from "@/components/tasks/TaskSort";
import { Task } from "../_lib/types/tasks";

type FilterMode = "all" | "complete" | "pending";
type SortMode = "creation-date" | "due-date" | "urgency";
type SortOrder = "asc" | "desc";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{
    filter?: FilterMode;
    sort?: SortMode;
    order?: SortOrder;
  }>;
}) {
  const supabase = await createClient();

  // Protect the route
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  // Get filter and sort from query params
  const params = await searchParams;
  const filter = params.filter || "all";
  const sort = params.sort || "creation-date";
  const order = params.order || "desc";

  // Read and filter the data
  let query = supabase.from("tasks").select("*");

  if (filter === "complete") {
    query = query.eq("status", true);
  } else if (filter === "pending") {
    query = query.eq("status", false);
  }

  const { data: tasks, error: dbError } = await query;

  // Apply sorting logic
  let sortedTasks = tasks || [];

  if (sort === "creation-date") {
    sortedTasks.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  } else if (sort === "due-date") {
    sortedTasks.sort((a, b) => {
      if (!a.due_date && !b.due_date) return 0;
      if (!a.due_date) return order === "asc" ? 1 : -1;
      if (!b.due_date) return order === "asc" ? -1 : 1;
      const dateA = new Date(a.due_date).getTime();
      const dateB = new Date(b.due_date).getTime();
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  } else if (sort === "urgency") {
    const now = new Date().getTime();
    sortedTasks.sort((a, b) => {
      const daysUntilA = a.due_date
        ? (new Date(a.due_date).getTime() - now) / (1000 * 60 * 60 * 24)
        : Infinity;
      const daysUntilB = b.due_date
        ? (new Date(b.due_date).getTime() - now) / (1000 * 60 * 60 * 24)
        : Infinity;

      // Both ascending and descending, closer to due date (including past) are more urgent
      const urgencyA = Math.abs(daysUntilA);
      const urgencyB = Math.abs(daysUntilB);

      if (order === "asc") {
        // Ascending: most urgent first (overdue tasks first, then closest to due date)
        if (daysUntilA < 0 && daysUntilB >= 0) return -1;
        if (daysUntilA >= 0 && daysUntilB < 0) return 1;
        return urgencyA - urgencyB;
      } else {
        // Descending: least urgent first
        if (daysUntilA < 0 && daysUntilB >= 0) return 1;
        if (daysUntilA >= 0 && daysUntilB < 0) return -1;
        return urgencyB - urgencyA;
      }
    });
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Create Section */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
          New Task
        </h2>
        <CreateTaskForm />
      </section>

      {/* List Section */}
      <section>
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            Your Tasks ({sortedTasks?.length || 0})
          </h2>
          <div className="flex flex-col gap-3">
            <TaskFilter />
            <TaskSort />
          </div>
        </div>

        <div className="space-y-3">
          {dbError && <p className="text-red-400">Could not load tasks.</p>}

          {sortedTasks?.map((data: Task) => (
            <TaskItem key={data.id} data={data} />
          ))}

          {sortedTasks?.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-xl">
              <p className="text-zinc-500 text-sm">
                No tasks found.
                {filter !== "all"
                  ? " Try a different filter!"
                  : " Get started by creating one!"}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
