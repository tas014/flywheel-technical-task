"use client";

import { useState } from "react";
import TaskItem from "./TaskItem";
import type { Task } from "@/app/_lib/types/tasks";
import type { PostgrestError } from "@supabase/supabase-js";
import Swap from "../UI/Icons/Swap";

type KanbanListProps = {
  tasks: Task[];
  dbError: PostgrestError | null;
  onError?: (message: string) => void;
  onTaskUpdate?: (task: Task) => void;
  onEditTask: (task: Task) => void;
};

export default function KanbanList({
  tasks,
  dbError,
  onError,
  onTaskUpdate,
  onEditTask,
}: KanbanListProps) {
  const [swapped, setSwapped] = useState(false);

  const pendingTasks = tasks.filter((task) => !task.status);
  const completedTasks = tasks.filter((task) => task.status);

  const firstColumn = swapped ? completedTasks : pendingTasks;
  const secondColumn = swapped ? pendingTasks : completedTasks;
  const firstLabel = swapped ? "Completed" : "Pending";
  const secondLabel = swapped ? "Pending" : "Completed";

  const renderColumn = (
    columnTasks: Task[],
    label: string,
    emptyMessage: string
  ) => (
    <div className="w-[85%] mx-1 my-3 shrink-0 snap-center md:w-auto bg-(--bg-tertiary)/50 rounded-xl border border-(--border-color) p-4">
      <h3 className="text-sm font-semibold text-(--text-secondary) uppercase tracking-wider mb-4">
        {label} ({columnTasks.length})
      </h3>
      <div className="space-y-2">
        {dbError && label === "Pending" && (
          <p className="text-sm">Could not load tasks.</p>
        )}
        {columnTasks.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-(--border-color) rounded-lg">
            <p className="text-sm">{emptyMessage}</p>
          </div>
        ) : (
          columnTasks.map((task) => (
            <TaskItem
              key={task.id}
              data={task}
              onError={onError}
              onTaskUpdate={onTaskUpdate}
              onEditTask={onEditTask}
            />
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="h-full">
      <div className="h-full md:h-full flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-[1fr_auto_1fr] gap-2 text-(--text-primary) pb-2 md:pb-0">
        {renderColumn(
          firstColumn,
          firstLabel,
          firstLabel === "Pending" ? "No pending tasks!" : "No completed tasks!"
        )}
        <div className="hidden md:flex items-center justify-center">
          <button
            onClick={() => setSwapped(!swapped)}
            className="cursor-pointer size-fit"
            title="Swap columns"
          >
            <Swap />
          </button>
        </div>
        {renderColumn(
          secondColumn,
          secondLabel,
          secondLabel === "Pending"
            ? "No pending tasks!"
            : "No completed tasks!"
        )}
      </div>
    </div>
  );
}
