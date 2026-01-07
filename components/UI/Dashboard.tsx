"use client";

import { useCallback, useTransition, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Task, FetchTasksParams } from "@/app/_lib/types/tasks";
import type { PostgrestError } from "@supabase/supabase-js";
import { addURLParams } from "@/app/_lib/fetching";
import ErrorNotification from "./ErrorNotification";
import Filters from "./Filters";
import Modal from "../shared/Modal";
import TaskListTransition from "../tasks/TaskListTransition";
import ViewSwitch from "../UI/ViewSwitch";
import NoTaskFound from "../tasks/NoTaskFound";
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
          <h2 className="text-sm font-semibold text-(--text-secondary) uppercase tracking-wider mb-4">
            Your Tasks ({sortedTasks?.length || 0})
          </h2>
          <div className="flex gap-3 justify-between">
            <Filters updateParams={updateParams} />
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-12 h-12 rounded-sm border-(--button-color) border-2 text-(--text-primary) hover:bg-(--button-color)/30 transition-all cursor-pointer"
              title="Create new task"
            >
              +
            </button>
          </div>
        </div>

        <div className="relative flex justify-center h-[70vh] w-full max-w-full overflow-hidden">
          <ViewSwitch
            tasks={sortedTasks}
            dbError={dbError}
            view={currentView}
            onViewChangeAction={updateParams}
            onError={setOperationError}
            onEditTask={handleEditTask}
          />

          <TaskListTransition
            taskCount={sortedTasks?.length || 0}
            isPending={isPending}
          >
            {sortedTasks?.length === 0 ? <NoTaskFound filter={filter} /> : ""}
          </TaskListTransition>
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
