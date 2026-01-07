"use client";

import { useCallback, useTransition, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Task, FetchTasksParams } from "@/app/_lib/types/tasks";
import type { PostgrestError } from "@supabase/supabase-js";
import { addURLParams } from "@/app/_lib/fetching";
import ErrorNotification from "./ErrorNotification";
import AddTaskButton from "./AddTaskButton";
import Filters from "./Filters";
import Modal from "../shared/Modal";
import ViewSwitch from "../UI/ViewSwitch";
import EditTaskForm from "../tasks/EditTaskForm";
import TaskCreationForm from "../tasks/TaskCreationForm";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("Loading...");
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setTaskToEdit(null), 300); // Clear after animation (if any) or simply valid cleanup
  };

  // Update ref whenever searchParams changes, but don't use it in dependency array
  searchParamsRef.current = searchParams;

  const currentView = (searchParams.get("view") || "kanban") as
    | "kanban"
    | "timeline";

  const updateParams = useCallback(
    (updates: FetchTasksParams) => {
      // Determine label based on what's changing
      if ("search" in updates) setLoadingLabel("Searching...");
      else if ("filter" in updates) setLoadingLabel("Filtering...");
      else if ("sort" in updates || "order" in updates)
        setLoadingLabel("Sorting...");
      else if ("view" in updates) setLoadingLabel("Loading...");

      const newUrl = addURLParams(searchParamsRef.current, updates);
      startTransition(() => {
        router.push(newUrl);
      });
    },
    [router]
  );

  return (
    <div>
      {/* Error Notification */}
      {operationError && (
        <ErrorNotification
          errorMessage={operationError}
          setErrorMessage={setOperationError}
        />
      )}

      {/* List Section */}
      <section>
        <div className="mb-6">
          <h2 className="text-base md:text-lg font-semibold text-(--text-secondary) uppercase tracking-wider mb-4">
            Your Tasks ({sortedTasks?.length || 0})
          </h2>
          <div className="flex gap-3 justify-between">
            <Filters
              setIsModalOpen={setIsModalOpen}
              updateParams={updateParams}
            />
          </div>
        </div>

        <div className="relative flex justify-center w-full max-w-full">
          <ViewSwitch
            tasks={sortedTasks}
            dbError={dbError}
            view={currentView}
            onViewChangeAction={updateParams}
            onError={setOperationError}
            onEditTask={handleEditTask}
            onAddTask={() => setIsModalOpen(true)}
            isPending={isPending}
            loadingLabel={loadingLabel}
            filter={filter}
          />
        </div>
      </section>

      {/* Edit Task Modal */}
      {isModalOpen && taskToEdit && (
        <Modal onClose={handleCloseModal}>
          <EditTaskForm task={taskToEdit} />
        </Modal>
      )}
      {/* Create Task Modal */}
      {isModalOpen && !taskToEdit && (
        <Modal onClose={handleCloseModal}>
          <TaskCreationForm />
        </Modal>
      )}
    </div>
  );
}
