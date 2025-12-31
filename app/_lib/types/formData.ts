interface AuthData {
  email: string;
  password: string;
}

interface TaskData {
  title: string;
  description?: string;
  dueDate?: Date;
  status?: boolean;
}

export type { AuthData, TaskData };
