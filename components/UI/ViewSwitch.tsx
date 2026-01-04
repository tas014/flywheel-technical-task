"use client";

import KanbanList from "@/components/tasks/KanbanList";
import TimelineList from "@/components/tasks/TimelineList";
import type { Task, View } from "@/app/_lib/types/tasks";
import type { PostgrestError } from "@supabase/supabase-js";

type ViewSwitchProps = {
  tasks: Task[];
  dbError: PostgrestError | null;
  view: View;
  onViewChangeAction: (updates: { view: View }) => void;
};

export default function ViewSwitch({
  tasks,
  dbError,
  view,
  onViewChangeAction,
}: ViewSwitchProps) {
  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => onViewChangeAction({ view: "kanban" })}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            view === "kanban"
              ? "bg-(--bg-secondary) text-(--button-color)"
              : "bg-(--button-color) hover:bg-(--button-highlight) text-(--text-primary)"
          }`}
        >
          Kanban
        </button>
        <button
          onClick={() => onViewChangeAction({ view: "timeline" })}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            view === "timeline"
              ? "bg-(--bg-secondary) text-(--button-color)"
              : "bg-(--button-color) hover:bg-(--button-highlight) text-(--text-primary)"
          }`}
        >
          Timeline
        </button>
      </div>

      {view === "kanban" && <KanbanList tasks={tasks} dbError={dbError} />}
      {view === "timeline" && <TimelineList tasks={tasks} dbError={dbError} />}
    </div>
  );
}
