import { Task, FilterMode, SortOrder, SortMode } from "./types/tasks";

function filterTasks(tasks: Task[], filter: FilterMode): Task[] {
  if (filter === "complete") {
    return tasks.filter((task) => task.status === true);
  } else if (filter === "pending") {
    return tasks.filter((task) => task.status === false);
  }
  return tasks;
}

function sortTasks(tasks: Task[], sort: SortMode, order: SortOrder): Task[] {
  const sorted = [...tasks];

  if (sort === "creation-date") {
    sorted.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  } else if (sort === "due-date") {
    sorted.sort((a, b) => {
      if (!a.due_date && !b.due_date) return 0;
      if (!a.due_date) return order === "asc" ? 1 : -1;
      if (!b.due_date) return order === "asc" ? -1 : 1;
      const dateA = new Date(a.due_date).getTime();
      const dateB = new Date(b.due_date).getTime();
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  } else if (sort === "urgency") {
    const now = new Date().getTime();
    sorted.sort((a, b) => {
      // Priority 1: Pending tasks (false) are more urgent than completed tasks (true)
      if (a.status !== b.status) {
        return a.status === true ? 1 : -1;
      }

      // Priority 2: Tasks with due dates are more urgent than tasks without
      const aHasDueDate = a.due_date !== null;
      const bHasDueDate = b.due_date !== null;
      if (aHasDueDate !== bHasDueDate) {
        return aHasDueDate ? -1 : 1;
      }

      // Priority 3: Sort by proximity to due date (for tasks that have one)
      if (aHasDueDate && bHasDueDate) {
        const daysUntilA =
          (new Date(a.due_date!).getTime() - now) / (1000 * 60 * 60 * 24);
        const daysUntilB =
          (new Date(b.due_date!).getTime() - now) / (1000 * 60 * 60 * 24);

        const urgencyA = Math.abs(daysUntilA);
        const urgencyB = Math.abs(daysUntilB);

        if (order === "asc") {
          if (daysUntilA < 0 && daysUntilB >= 0) return -1;
          if (daysUntilA >= 0 && daysUntilB < 0) return 1;
          return urgencyA - urgencyB;
        } else {
          if (daysUntilA < 0 && daysUntilB >= 0) return 1;
          if (daysUntilA >= 0 && daysUntilB < 0) return -1;
          return urgencyB - urgencyA;
        }
      }

      return 0;
    });
  }

  return sorted;
}

export type { FilterMode, SortMode, SortOrder };
export { filterTasks, sortTasks };
