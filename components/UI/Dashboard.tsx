"use client";

import { useCallback, useTransition, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Filters from "./Filters";
import TaskListTransition from "@/components/tasks/TaskListTransition";
import ErrorNotification from "./ErrorNotification";
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
  const [operationError, setOperationError] = useState<string | null>(null);

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
          <h2 className="text-sm font-semibold text-(--text-secondary) uppercase tracking-wider mb-4">
            Your Tasks ({sortedTasks?.length || 0})
          </h2>
          <Filters updateParams={updateParams} />
        </div>

        <div className="relative">
          <ViewSwitch
            tasks={sortedTasks}
            dbError={dbError}
            view={currentView}
            onViewChangeAction={updateParams}
            onError={setOperationError}
          />

          <TaskListTransition
            taskCount={sortedTasks?.length || 0}
            isPending={isPending}
          >
            {sortedTasks?.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-(--border-color) rounded-xl">
                <p className="text-(--text-secondary) text-sm">
                  No tasks found.
                  {filter !== "all"
                    ? " Try a different filter!"
                    : " Get started by creating one!"}
                </p>
              </div>
            ) : (
              ""
            )}
          </TaskListTransition>
        </div>
      </section>
      {/* Error Notification */}
      {operationError && (
        <ErrorNotification
          errorMessage={operationError}
          setErrorMessage={setOperationError}
        />
      )}
    </div>
  );
}
