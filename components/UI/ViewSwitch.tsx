"use client";

import { useState, useEffect } from "react";
import KanbanList from "@/components/tasks/KanbanList";
import TimelineList from "@/components/tasks/TimelineList";
import TaskListTransition from "@/components/tasks/TaskListTransition";
import NoTaskFound from "@/components/tasks/NoTaskFound";
import type { Task, View } from "@/app/_lib/types/tasks";
import type { PostgrestError } from "@supabase/supabase-js";

type ViewSwitchProps = {
  tasks: Task[];
  dbError: PostgrestError | null;
  view: View;
  onViewChangeAction: (updates: { view: View }) => void;
  onError?: (message: string) => void;
  onEditTask: (task: Task) => void;
  onAddTask: () => void;
  isPending: boolean;
  loadingLabel: string;
  filter: string;
};

export default function ViewSwitch({
  tasks: initialTasks,
  dbError,
  view,
  onViewChangeAction,
  onError,
  onEditTask,
  onAddTask,

  isPending,
  loadingLabel,
  filter,
}: ViewSwitchProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [localView, setLocalView] = useState(view);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleViewChange = (newView: View) => {
    setLocalView(newView);
    onViewChangeAction({ view: newView });
  };

  return (
    <div className="w-full bg-(--background-soft)/20 rounded-md grid grid-rows-[auto_1fr]">
      <div className="grid lg:grid-cols-2 lg:divide-x-2 divide-(--bg-task-view) border-b-1 border-(--bg-task-view)">
        <button
          onClick={() => handleViewChange("kanban")}
          className={`px-4 py-2 text-sm transition-colors cursor-pointer text-xl ${
            localView === "kanban"
              ? "bg-(--bg-task-view) text-(--text-tertiary) font-bold"
              : "hover:bg-(--bg-task-view)/80 hover:text-(--text-tertiary) font-medium"
          }`}
        >
          Kanban
        </button>
        <button
          onClick={() => handleViewChange("timeline")}
          className={`px-4 py-2 text-sm transition-colors cursor-pointer text-xl ${
            localView === "timeline"
              ? "bg-(--bg-task-view) text-(--text-tertiary) font-bold"
              : "hover:bg-(--bg-task-view)/80 hover:text-(--text-tertiary) font-medium"
          }`}
        >
          Timeline
        </button>
      </div>
      <div className="bg-(--text-primary)/10 flex justify-center items-center">
        <TaskListTransition
          taskCount={tasks.length}
          isPending={isPending}
          loadingLabel={loadingLabel}
        >
          {tasks.length === 0 ? (
            <NoTaskFound filter={filter} onAddTask={onAddTask} />
          ) : (
            <>
              {localView === "kanban" && (
                <KanbanList
                  tasks={tasks}
                  dbError={dbError}
                  onError={onError}
                  onTaskUpdate={handleTaskUpdate}
                  onEditTask={onEditTask}
                />
              )}
              {localView === "timeline" && (
                <TimelineList
                  tasks={tasks}
                  dbError={dbError}
                  onError={onError}
                  onTaskUpdate={handleTaskUpdate}
                  onEditTask={onEditTask}
                />
              )}
            </>
          )}
        </TaskListTransition>
      </div>
    </div>
  );
}
