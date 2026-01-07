import AddTaskButton from "../UI/AddTaskButton";

export default function NoTaskFound({
  filter,
  onAddTask,
}: {
  filter: string;
  onAddTask: () => void;
}) {
  return (
    <div className="text-center h-full py-12 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-(--border-color) rounded-xl">
      <p className="text-(--text-secondary) text-sm">
        No tasks found.
        {filter !== "all"
          ? " Try a different filter!"
          : " Get started by creating one!"}
      </p>
      <AddTaskButton onClick={onAddTask} />
    </div>
  );
}
