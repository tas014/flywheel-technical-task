"use client";

import TaskItem from "./TaskItem";
import type { Task } from "@/app/_lib/types/tasks";
import type { PostgrestError } from "@supabase/supabase-js";

type TimelineListProps = {
  tasks: Task[];
  dbError: PostgrestError | null;
  onError?: (message: string) => void;
  onTaskUpdate?: (task: Task) => void;
  onEditTask: (task: Task) => void;
};

export default function TimelineList({ tasks, dbError, onError, onTaskUpdate, onEditTask }: TimelineListProps) {
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

  for (const task of tasksWithDeadlines) {
    const createdDate = new Date(task.created_at);
    const dueDate = new Date(task.due_date!);

    if (!minDate || createdDate < minDate) {
      minDate = createdDate;
    }
    if (!maxDate || dueDate > maxDate) {
      maxDate = dueDate;
    }
  }

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
              <TaskItem key={task.id} data={task} onError={onError} onTaskUpdate={onTaskUpdate} onEditTask={onEditTask} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Ensure at least 10 dates range provided
  const minRequiredEndDate = new Date(minDate);
  minRequiredEndDate.setDate(minRequiredEndDate.getDate() + 9);
  
  if (maxDate < minRequiredEndDate) {
    maxDate = minRequiredEndDate;
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

      {/* Unified Timeline Container */}
      <div className="mb-6 overflow-x-auto pb-4">
        <div 
          className="relative px-4 [--col-width:20%] landscape:[--col-width:12.5%] md:[--col-width:10%]"
          style={{ width: `max(100%, calc(${dateRange.length} * var(--col-width)))` }}
        >
          {/* Vertical Grid Lines */}
          <div className="absolute inset-0 px-4 pointer-events-none flex">
            {dateRange.map((_, index) => (
              <div 
                key={index} 
                className={`flex-1 border-r border-dashed border-(--border-tertiary)/30 ${index === dateRange.length - 1 ? 'border-r-0' : ''}`} 
              />
            ))}
          </div>

          {/* Timeline Header with Dates */}
          <h3 className="sticky left-0 text-sm font-semibold text-(--text-secondary) uppercase tracking-wider mb-3 bg-(--bg-primary)">
            Timeline
          </h3>
          
          <div className="flex mb-2 relative z-10">
            {dateRange.map((date, index) => (
              <div
                key={index}
                className="flex-1 text-center text-xs font-medium text-(--text-secondary) p-2 mx-1 bg-(--bg-tertiary)/50 rounded"
              >
                <div className="text-(--text-secondary)">{date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</div>
                <div className="text-(--text-tertiary)">{date.toLocaleDateString("en-US", { weekday: "narrow" })}</div>
              </div>
            ))}
          </div>

          {/* Tasks positioned in timeline */}
          <div className="space-y-2 relative z-10">
            {tasksWithDeadlines.map((task) => {
              const range = taskDateRanges.get(task.id);
              if (!range) return null;

              const singleColumnPercent = 100 / dateRange.length;
              const startOffset = range.startIndex * singleColumnPercent;
              const spanWidth = (range.endIndex - range.startIndex + 1) * singleColumnPercent;

              return (
                <div
                  key={task.id}
                  style={{
                    marginLeft: `${startOffset}%`,
                    width: `${spanWidth}%`,
                    paddingLeft: '0.25rem', // gap compensation (mx-1 is 0.25rem)
                    paddingRight: '0.25rem'
                  }}
                >
                  <TaskItem data={task} onError={onError} onTaskUpdate={onTaskUpdate} onEditTask={onEditTask} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* No Deadline Section */}
      {noDeadlineTasks.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-(--text-secondary) uppercase tracking-wider mb-3 px-4">
            No Deadline ({noDeadlineTasks.length})
          </h3>
          <div className="space-y-2 px-4">
            {noDeadlineTasks.map((task) => (
              <TaskItem key={task.id} data={task} onError={onError} onTaskUpdate={onTaskUpdate} onEditTask={onEditTask} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
