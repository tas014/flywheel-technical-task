import TaskFilter from "@/components/tasks/TaskFilter";
import TaskSearchbar from "@/components/tasks/TaskSearchbar";
import TaskSort from "@/components/tasks/TaskSort";
import type { FetchTasksParams } from "@/app/_lib/types/tasks";
import AddTaskButton from "./AddTaskButton";

interface Props {
  updateParams: (params: FetchTasksParams) => void;
  setIsModalOpen: (open: boolean) => void;
}

export default function Filters({ updateParams, setIsModalOpen }: Props) {
  return (
    <div className="grid gap-3 lg:flex landscape:flex">
      <div className="flex gap-3">
        <TaskSearchbar onSearchChange={updateParams} />
        <AddTaskButton onClick={() => setIsModalOpen(true)} />
      </div>
      <div className="flex gap-3">
        <TaskFilter onFilterChange={updateParams} />
        <TaskSort onParamsChange={updateParams} />
      </div>
    </div>
  );
}
