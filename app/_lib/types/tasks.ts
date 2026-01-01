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

export type { Task, TaskInsert, TaskUpdate, TaskFormData };
