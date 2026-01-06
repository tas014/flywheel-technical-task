"use client";

import { useState, useEffect } from "react";
import KanbanList from "@/components/tasks/KanbanList";
import TimelineList from "@/components/tasks/TimelineList";
import type { Task, View } from "@/app/_lib/types/tasks";
import type { PostgrestError } from "@supabase/supabase-js";

type ViewSwitchProps = {
  tasks: Task[];
  dbError: PostgrestError | null;
  view: View;
  onViewChangeAction: (updates: { view: View }) => void;
  onError?: (message: string) => void;
  onEditTask: (task: Task) => void;
};

export default function ViewSwitch({
  tasks: initialTasks,
  dbError,
  view,
  onViewChangeAction,
  onError,
  onEditTask,
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
    <div className="w-full bg-(--bg-translucent) rounded-xl h-full grid grid-rows-[auto_1fr] overflow-hidden">
      <div className="grid grid-cols-2 divide-x-2 divide-(--bg-task-view) border-b-1 border-(--bg-task-view)">
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
      <div className="p-4 max-w-full min-w-0 overflow-hidden">
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
      </div>
    </div>
  );
}
