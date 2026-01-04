"use client";

import TaskItem from "./TaskItem";
import type { Task } from "@/app/_lib/types/tasks";
import type { PostgrestError } from "@supabase/supabase-js";

type TimelineListProps = {
  tasks: Task[];
  dbError: PostgrestError | null;
};

export default function TimelineList({ tasks, dbError }: TimelineListProps) {
  if (tasks.length === 0) {
    return (
      <div>
        {dbError && (
          <div className="mb-4 p-4 rounded-lg bg-(--bg-error)/20 border border-(--text-error)">
            <p className="text-(--text-error) text-sm">Could not load tasks.</p>
          </div>
        )}
        <div className="text-center py-12 border-2 border-dashed border-(--border-color) rounded-xl">
          <p className="text-(--text-secondary) text-sm">No tasks found. Get started by creating one!</p>
        </div>
      </div>
    );
  }

  // Separate tasks by deadline status
  const noDeadlineTasks = tasks.filter((task) => !task.due_date);
  const tasksWithDeadlines = tasks.filter((task) => task.due_date);

  // Get date range from earliest created_at to latest due_date
  let minDate: Date | null = null;
  let maxDate: Date | null = null;

  tasksWithDeadlines.forEach((task) => {
    const createdDate = new Date(task.created_at);
    const dueDate = new Date(task.due_date!);

    if (!minDate || createdDate < minDate) {
      minDate = createdDate;
    }
    if (!maxDate || dueDate > maxDate) {
      maxDate = dueDate;
    }
  });

  if (!minDate || !maxDate) {
    // Only tasks without deadlines
    return (
      <div>
        {dbError && (
          <div className="mb-4 p-4 rounded-lg bg-(--bg-error)/20 border border-(--text-error)">
            <p className="text-(--text-error) text-sm">Could not load tasks.</p>
          </div>
        )}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-(--text-secondary) uppercase tracking-wider mb-3 px-4">
            No Deadline ({noDeadlineTasks.length})
          </h3>
          <div className="space-y-2 px-4">
            {noDeadlineTasks.map((task) => (
              <TaskItem key={task.id} data={task} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Generate all dates in range (inclusive)
  const dateRange: Date[] = [];
  const currentDate = new Date(minDate);
  currentDate.setHours(0, 0, 0, 0);
  maxDate.setHours(0, 0, 0, 0);

  while (currentDate <= maxDate) {
    dateRange.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Map each task to columns it occupies
  const taskDateRanges = new Map<number, { startIndex: number; endIndex: number }>();
  tasksWithDeadlines.forEach((task) => {
    const createdDate = new Date(task.created_at);
    createdDate.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.due_date!);
    dueDate.setHours(0, 0, 0, 0);

    const startIndex = dateRange.findIndex(
      (d) => d.getTime() === createdDate.getTime()
    );
    const endIndex = dateRange.findIndex(
      (d) => d.getTime() === dueDate.getTime()
    );

    if (startIndex !== -1 && endIndex !== -1) {
      taskDateRanges.set(task.id, { startIndex, endIndex });
    }
  });

  return (
    <div>
      {dbError && (
        <div className="mb-4 p-4 rounded-lg bg-(--bg-error)/20 border border-(--text-error)">
          <p className="text-(--text-error) text-sm">Could not load tasks.</p>
        </div>
      )}

      {/* Timeline Header with Dates */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-(--text-secondary) uppercase tracking-wider mb-3 px-4">
          Timeline
        </h3>
        <div className="flex gap-1 px-4 overflow-x-auto">
          {dateRange.map((date, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-20 text-center text-xs font-medium text-(--text-secondary) p-2 bg-(--bg-tertiary)/50 rounded"
            >
              <div className="text-(--text-secondary)">{date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</div>
              <div className="text-(--text-tertiary)">{date.toLocaleDateString("en-US", { weekday: "narrow" })}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tasks positioned in timeline */}
      <div className="px-4 space-y-2">
        {tasksWithDeadlines.map((task) => {
          const range = taskDateRanges.get(task.id);
          if (!range) return null;

          const columnWidth = 80 + 4; // w-20 (80px) + gap-1 (4px)
          const startOffset = range.startIndex * columnWidth;
          const spanWidth = (range.endIndex - range.startIndex + 1) * columnWidth - 4;

          return (
            <div
              key={task.id}
              style={{
                marginLeft: `calc(1rem + ${startOffset}px)`,
                width: `${spanWidth}px`,
              }}
            >
              <TaskItem data={task} />
            </div>
          );
        })}
      </div>

      {/* No Deadline Section */}
      {noDeadlineTasks.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-(--text-secondary) uppercase tracking-wider mb-3 px-4">
            No Deadline ({noDeadlineTasks.length})
          </h3>
          <div className="space-y-2 px-4">
            {noDeadlineTasks.map((task) => (
              <TaskItem key={task.id} data={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
