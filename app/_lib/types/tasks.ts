import { Database } from "../../../lib/types/database";

type Task = Database["public"]["Tables"]["tasks"]["Row"];
type TaskInsert = Database["public"]["Tables"]["tasks"]["Insert"];
type TaskUpdate = Database["public"]["Tables"]["tasks"]["Update"];
type TaskFormData = {
  title: string | null;
  description: string | null;
  due_date: string | null;
  status: boolean;
};

type FilterMode = "all" | "complete" | "pending";
type SortMode = "creation-date" | "due-date" | "urgency" | "none";
type SortOrder = "asc" | "desc";
type View = "timeline" | "kanban";

type FetchTasksParams = {
  filter?: FilterMode;
  sort?: SortMode;
  order?: SortOrder;
  search?: string;
  view?: View;
};

export type {
  Task,
  TaskInsert,
  TaskUpdate,
  TaskFormData,
  FilterMode,
  SortMode,
  SortOrder,
  View,
  FetchTasksParams,
};
