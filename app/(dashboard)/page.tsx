import TaskItem from "@/components/tasks/TaskItem";
import CreateTaskForm from "@/components/tasks/TaskCreationForm";
import TaskFilter from "@/components/tasks/TaskFilter";
import TaskSearchBar from "@/components/tasks/TaskSearchbar";
import TaskSort from "@/components/tasks/TaskSort";
import TaskListTransition from "@/components/tasks/TaskListTransition";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Task, FetchTasksParams } from "../_lib/types/tasks";
import { fetchAndProcessTasks } from "../_lib/fetching";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<FetchTasksParams>;
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

  // Get params from query string
  const params = await searchParams;

  // Fetch and process tasks with search, filter, and sort
  const { tasks: sortedTasks, error: dbError } = await fetchAndProcessTasks(
    supabase,
    params
  );

  const filter = params.filter || "all";

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
            <TaskSearchBar />
          </div>
        </div>

        <div className="relative">
          <TaskListTransition taskCount={sortedTasks?.length || 0}>
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
          </TaskListTransition>
        </div>
      </section>
    </div>
  );
}
