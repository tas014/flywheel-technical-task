import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { FetchTasksParams } from "../_lib/types/tasks";
import { fetchAndProcessTasks } from "../_lib/fetching";
import Dashboard from "@/components/UI/Dashboard";

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
    <>
      <h1 className="md:text-4xl font-bold">FlyWheel task Manager</h1>
      <section>
        <Dashboard
          sortedTasks={sortedTasks}
          dbError={dbError}
          filter={filter}
        />
      </section>
    </>
  );
}
