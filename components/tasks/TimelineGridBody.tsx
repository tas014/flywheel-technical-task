import TaskItem from "./TaskItem";
import type { Task } from "@/app/_lib/types/tasks";

type TimelineGridBodyProps = {
  tasks: Task[];
  taskDateRanges: Map<number, { startIndex: number; endIndex: number }>;
  onError?: (message: string) => void;
  onTaskUpdate?: (task: Task) => void;
  onEditTask: (task: Task) => void;
};

export default function TimelineGridBody({
  tasks,
  taskDateRanges,
  onError,
  onTaskUpdate,
  onEditTask,
}: TimelineGridBodyProps) {
  return (
    <>
      {tasks.map((task, index) => {
        const range = taskDateRanges.get(task.id);
        if (!range) return null;

        return (
          <div
            key={task.id}
            className="mx-1 z-10"
            style={{
              gridRow: index + 2,
              gridColumnStart: range.startIndex + 1,
              gridColumnEnd: range.endIndex + 2,
            }}
          >
            <TaskItem
              data={task}
              onError={onError}
              onTaskUpdate={onTaskUpdate}
              onEditTask={onEditTask}
            />
          </div>
        );
      })}
    </>
  );
}
