export default function NoTaskFound({filter}: {filter: string}) {
  return (
    <div className="text-center py-12 border-2 border-dashed border-(--border-color) rounded-xl">
      <p className="text-(--text-secondary) text-sm">
        No tasks found.
        {filter !== "all"
          ? " Try a different filter!"
          : " Get started by creating one!"}
      </p>
    </div>
  );
}