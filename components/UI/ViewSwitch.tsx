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
    <div>
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => handleViewChange("kanban")}
          className={`px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
            localView === "kanban"
              ? "bg-(--button-highlight) text-(--button-color) font-bold"
              : "bg-(--button-color) hover:bg-(--button-highlight) hover:text-(--button-color) font-medium"
          }`}
        >
          Kanban
        </button>
        <button
          onClick={() => handleViewChange("timeline")}
          className={`px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
            localView === "timeline"
              ? "bg-(--button-highlight) text-(--button-color) font-bold"
              : "bg-(--button-color) hover:bg-(--button-highlight) hover:text-(--button-color) font-medium"
          }`}
        >
          Timeline
        </button>
      </div>

      {localView === "kanban" && <KanbanList tasks={tasks} dbError={dbError} onError={onError} onTaskUpdate={handleTaskUpdate} onEditTask={onEditTask} />}
      {localView === "timeline" && <TimelineList tasks={tasks} dbError={dbError} onError={onError} onTaskUpdate={handleTaskUpdate} onEditTask={onEditTask} />}
    </div>
  );
}
