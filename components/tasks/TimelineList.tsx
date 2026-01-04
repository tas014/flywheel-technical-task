"use client";

import TaskItem from "./TaskItem";
import type { Task } from "@/app/_lib/types/tasks";
import type { PostgrestError } from "@supabase/supabase-js";

type TimelineListProps = {
  tasks: Task[];
  dbError: PostgrestError | null;
};

export default function TimelineList({ tasks, dbError }: TimelineListProps) {
  // Separate tasks by due_date
  const noDeadlineTasks = tasks.filter((task) => !task.due_date);
  const tasksWithDeadlines = tasks.filter((task) => task.due_date);

  // Group tasks with deadlines by date
  const tasksByDate = new Map<string, Task[]>();
  tasksWithDeadlines.forEach((task) => {
    const dateKey = task.due_date!;
    if (!tasksByDate.has(dateKey)) {
      tasksByDate.set(dateKey, []);
    }
    tasksByDate.get(dateKey)!.push(task);
  });

  // Sort dates chronologically
  const sortedDates = Array.from(tasksByDate.keys()).sort();

  const renderSection = (title: string, sectionTasks: Task[], isNoDeadline = false) => (
    <div key={title} className="mb-6">
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3 px-4">
        {title} ({sectionTasks.length})
      </h3>
      <div className="space-y-2 px-4">
        {sectionTasks.length === 0 ? (
          <div className="text-center py-6 border-2 border-dashed border-zinc-800 rounded-lg">
            <p className="text-zinc-600 text-sm">
              {isNoDeadline ? "No tasks without deadlines" : "No tasks for this date"}
            </p>
          </div>
        ) : (
          sectionTasks.map((task) => <TaskItem key={task.id} data={task} />)
        )}
      </div>
    </div>
  );

  return (
    <div>
      {dbError && (
        <div className="mb-4 p-4 rounded-lg bg-red-900/20 border border-red-800">
          <p className="text-red-400 text-sm">Could not load tasks.</p>
        </div>
      )}

      <div className="space-y-0">
        {/* No Deadline Section */}
        {renderSection("No Deadline", noDeadlineTasks, true)}

        {/* Sections for each due date */}
        {sortedDates.map((dateKey) => {
          const date = new Date(dateKey);
          const formattedDate = date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          return renderSection(
            formattedDate,
            tasksByDate.get(dateKey)!
          );
        })}

        {/* Empty state if no tasks at all */}
        {tasks.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-xl">
            <p className="text-zinc-500 text-sm">No tasks found. Get started by creating one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
