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
    <div className="w-full bg-(--bg-translucent) rounded-md grid grid-rows-[auto_1fr]">
      <div className="grid lg:grid-cols-2 lg:divide-x-2 divide-(--bg-task-view) border-b-1 border-(--bg-task-view)">
        <button
          onClick={() => handleViewChange("kanban")}
          className={`px-4 py-2 text-sm transition-colors cursor-pointer text-xl ${
            localView === "kanban"
              ? "bg-(--bg-task-view) text-(--text-tertiary) font-bold"
              : "hover:bg-(--bg-task-view) hover:text-(--text-tertiary) font-medium"
          }`}
        >
          Kanban
        </button>
        <button
          onClick={() => handleViewChange("timeline")}
          className={`px-4 py-2 text-sm transition-colors cursor-pointer text-xl ${
            localView === "timeline"
              ? "bg-(--bg-task-view) text-(--text-tertiary) font-bold"
              : "hover:bg-(--bg-task-view) hover:text-(--text-tertiary) font-medium"
          }`}
        >
          Timeline
        </button>
      </div>
      <div className="w-[clamp(400px,calc(100vw-4rem),2500px)] h-[clamp(600px,90vh,1500px)] lg:p-4 ">
        <TaskListTransition taskCount={tasks.length} isPending={isPending}>
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
