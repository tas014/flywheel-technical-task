import Plus from "./Icons/Plus";

export default function AddTaskButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 flex items-center justify-center rounded-sm border-(--button-color) border-2 text-(--text-primary) hover:bg-(--button-color)/30 transition-all cursor-pointer"
      title="Create new task"
    >
      <Plus />
    </button>
  );
}
