"use client";

import { useState } from "react";
import TaskItem from "./TaskItem";
import type { Task } from "@/app/_lib/types/tasks";
import type { PostgrestError } from "@supabase/supabase-js";

type KanbanListProps = {
  tasks: Task[];
  dbError: PostgrestError | null;
};

export default function KanbanList({ tasks, dbError }: KanbanListProps) {
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
    <div className="flex-1 bg-zinc-900/50 rounded-xl border border-zinc-800 p-4">
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
        {label} ({columnTasks.length})
      </h3>
      <div className="space-y-2">
        {dbError && label === "Pending" && (
          <p className="text-red-400 text-sm">Could not load tasks.</p>
        )}
        {columnTasks.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-zinc-800 rounded-lg">
            <p className="text-zinc-600 text-sm">{emptyMessage}</p>
          </div>
        ) : (
          columnTasks.map((task) => <TaskItem key={task.id} data={task} />)
        )}
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setSwapped(!swapped)}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
          title="Swap columns"
        >
          Swap Columns
        </button>
      </div>

      <div className="flex gap-4">
        {renderColumn(
          firstColumn,
          firstLabel,
          firstLabel === "Pending"
            ? "No pending tasks!"
            : "No completed tasks!"
        )}
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
