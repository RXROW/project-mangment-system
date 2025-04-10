export type Status = 'ToDo' | 'InProgress' | 'Done'

export type TasksResponse = {
    data: Task[];
  
    pageNumber: number;
  
    pageSize: number;
  
    totalNumberOfPages: number;
  
    totalNumberOfRecords: number;
  };
  
  export type Task = {
    id: number;
    title: string;
    description: string;
    status: Status;
  };
  