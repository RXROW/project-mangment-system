export interface TaskData {
  title: string;
  description: string;
  employeeId: number;
  projectId?: number;
}
export interface TaskResponse {
  title: string;
  description: string;
  employee: {
    id: number;
  };
}
export interface RouteParams {
  taskId?: number;
}
export interface CurrentTask {
  id: number;
  title: string;
  status: string;
  description: string;
  creationDate: string;
  employee?: {
    userName: string;
  };
}
