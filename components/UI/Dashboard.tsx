"use client";

import { useCallback, useTransition, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TaskItem from "@/components/tasks/TaskItem";
import TaskFilter from "@/components/tasks/TaskFilter";
import TaskSearchBar from "@/components/tasks/TaskSearchbar";
import TaskSort from "@/components/tasks/TaskSort";
import TaskListTransition from "@/components/tasks/TaskListTransition";
import type { Task, FetchTasksParams } from "@/app/_lib/types/tasks";
import type { PostgrestError } from "@supabase/supabase-js";
import { addURLParams } from "@/app/_lib/fetching";
import ViewSwitch from "./ViewSwitch";

type PageContentProps = {
  sortedTasks: Task[];
  dbError: PostgrestError | null;
  filter: string;
};

export default function Dashboard({
  sortedTasks,
  dbError,
  filter,
}: PageContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsRef = useRef(searchParams);
  const [isPending, startTransition] = useTransition();

  // Update ref whenever searchParams changes, but don't use it in dependency array
  searchParamsRef.current = searchParams;

  const currentView = (searchParams.get("view") || "kanban") as
    | "kanban"
    | "timeline";

  const updateParams = useCallback(
    (updates: FetchTasksParams) => {
      const newUrl = addURLParams(searchParamsRef.current, updates);
      startTransition(() => {
        router.push(newUrl);
      });
    },
    [router]
  );

  return (
    <div>
      {/* List Section */}
      <section>
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            Your Tasks ({sortedTasks?.length || 0})
          </h2>
          <div className="flex flex-col gap-3">
            <TaskSearchBar onSearchChange={updateParams} />
            <TaskFilter onFilterChange={updateParams} />
            <TaskSort onParamsChange={updateParams} />
          </div>
        </div>

        <div className="relative">
          <TaskListTransition
            taskCount={sortedTasks?.length || 0}
            isPending={isPending}
          >
            {sortedTasks?.length !== 0 ? (
              <ViewSwitch
                tasks={sortedTasks}
                dbError={dbError}
                view={currentView}
                onViewChangeAction={updateParams}
              />
            ) : (
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
