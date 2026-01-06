import TaskFilter from "@/components/tasks/TaskFilter";
import TaskSearchbar from "@/components/tasks/TaskSearchbar";
import TaskSort from "@/components/tasks/TaskSort";
import type { FetchTasksParams } from "@/app/_lib/types/tasks";

interface Props {
  updateParams: (params: FetchTasksParams) => void;
}

export default function Filters({updateParams}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <TaskSearchbar onSearchChange={updateParams} />
      <TaskFilter onFilterChange={updateParams} />
      <TaskSort onParamsChange={updateParams} />
    </div>
  );
}