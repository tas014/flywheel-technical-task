"use client";

import TaskItem from "./TaskItem";
import TimelineGridHead from "./TimelineGridHead";
import TimelineGridBody from "./TimelineGridBody";
import type { Task } from "@/app/_lib/types/tasks";
import type { PostgrestError } from "@supabase/supabase-js";

type TimelineListProps = {
  tasks: Task[];
  dbError: PostgrestError | null;
  onError?: (message: string) => void;
  onTaskUpdate?: (task: Task) => void;
  onEditTask: (task: Task) => void;
};

export default function TimelineList({
  tasks,
  dbError,
  onError,
  onTaskUpdate,
  onEditTask,
}: TimelineListProps) {
  const hasTasks = tasks.length > 0;
  /* filtered lists removed, processing all tasks now */
  const tasksWithDeadlines = tasks.filter((task) => task.due_date);

  // Get date range logic
  let minDate: Date | null = null;
  let maxDate: Date | null = null;

  for (const task of tasksWithDeadlines) {
    const createdDate = new Date(task.created_at);
    const dueDate = new Date(task.due_date!);

    if (!minDate || createdDate < minDate) minDate = createdDate;
    if (!maxDate || dueDate > maxDate) maxDate = dueDate;
  }

  // Ensure minimum range
  if (minDate) {
    const minRequiredEndDate = new Date(minDate);
    minRequiredEndDate.setDate(minRequiredEndDate.getDate() + 9);
    if (maxDate && maxDate < minRequiredEndDate) {
      maxDate = minRequiredEndDate;
    }
  }

  // Generate date range
  const dateRange: Date[] = [];
  if (minDate && maxDate) {
    const currentDate = new Date(minDate);
    currentDate.setHours(0, 0, 0, 0);
    maxDate.setHours(0, 0, 0, 0);

    while (currentDate <= maxDate) {
      dateRange.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  // Map tasks to columns
  const taskDateRanges = new Map<
    number,
    { startIndex: number; endIndex: number }
  >();
  if (dateRange.length > 0) {
    tasks.forEach((task) => {
      let startIndex = -1;
      let endIndex = -1;

      if (task.due_date) {
        const createdDate = new Date(task.created_at);
        createdDate.setHours(0, 0, 0, 0);
        const dueDate = new Date(task.due_date);
        dueDate.setHours(0, 0, 0, 0);

        startIndex = dateRange.findIndex(
          (d) => d.getTime() === createdDate.getTime()
        );
        endIndex = dateRange.findIndex(
          (d) => d.getTime() === dueDate.getTime()
        );
      } else {
        // Tasks without deadline span the entire timeline
        startIndex = 0;
        endIndex = dateRange.length - 1;
      }

      if (startIndex !== -1 && endIndex !== -1) {
        taskDateRanges.set(task.id, { startIndex, endIndex });
      }
    });
  }

  const showTimeline = dateRange.length > 0 && tasksWithDeadlines.length > 0;

  return (
    <div className="h-full flex flex-col">
      {dbError && (
        <div className="mb-4 p-4 rounded-lg bg-(--bg-error)/20 border border-(--text-error)">
          <p className="text-(--text-error) text-sm">Could not load tasks.</p>
        </div>
      )}

      {!hasTasks ? (
        <div className="h-full text-center border-2 border-dashed border-(--border-color) rounded-sm">
          <p className="text-(--text-secondary) text-sm">
            No tasks found. Get started by creating one!
          </p>
        </div>
      ) : (
        <div className="h-full flex overflow-x-auto snap-x snap-mandatory gap-4 md:block md:pb-0">
          {showTimeline && (
            <div className="shrink-0 snap-center w-full h-full overflow-auto min-h-0">
              <div
                className="grid gap-y-2 relative w-[max-content] min-w-[max-content] min-h-full [--timeline-col-width:25vw] md:[--timeline-col-width:20vw] lg:[--timeline-col-width:15vw]"
                style={{
                  gridTemplateColumns: `repeat(${dateRange.length}, minmax(140px, var(--timeline-col-width)))`,
                  gridTemplateRows: `max-content repeat(${tasks.length}, max-content) 1fr`,
                  backgroundImage:
                    "linear-gradient(to right, var(--foreground) 1px, transparent 1px)",
                  backgroundSize: `calc(100% / ${dateRange.length}) 100%`,
                }}
              >
                <TimelineGridHead dateRange={dateRange} />
                <TimelineGridBody
                  tasks={tasks}
                  taskDateRanges={taskDateRanges}
                  onError={onError}
                  onTaskUpdate={onTaskUpdate}
                  onEditTask={onEditTask}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
