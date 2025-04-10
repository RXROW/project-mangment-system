import { Dispatch, SetStateAction } from 'react'

export interface TaskData {
  title: string
  description: string
  employeeId: number
  projectId?: number
}
export interface Task {
  id: number
  title: string
  status: string
  description: string
  creationDate: string
  employee?: {
    userName: string
  }
}

export interface Employee {
  id: number
  userName: string
}

export interface TaskResponse {
  title: string
  description: string
  employee: Employee
}

export interface RouteParams {
  taskId?: string
}

export interface CurrentTask {
  id: number
  title: string
  status: TaskStatus
  description: string
  creationDate: string
  employee?: Employee
}

export type TaskStatus = 'ToDo' | 'InProgress' | 'Done'

export interface PaginationTask {
  currentPage: number
  totalNumberOfRecords: number
  totalNumberOfPages: number
}

export interface TaskApiResponse {
  data: CurrentTask[]
  pageNumber: number
  pageSize: number
  totalNumberOfRecords: number
  totalNumberOfPages: number
}
// Task State Management
export interface TaskState {
  tasks: CurrentTask[]
  setTasks: Dispatch<SetStateAction<CurrentTask[]>>
}

// Search and Filter State
export interface TaskFilterState {
  setSearchQueryTasks: Dispatch<SetStateAction<string>>
  StatsTasks: TaskStatus
  setStatsTasks: Dispatch<SetStateAction<TaskStatus>>
}

// Task Actions
export interface TaskActions {
  alltasks: (
    pageSize?: number,
    pageNumber?: number,
    title?: string,
    status?: TaskStatus
  ) => Promise<void>
}

// User State for Tasks
export interface UserTaskState {
  userfortask: Employee[]
  setUserfortask: Dispatch<SetStateAction<Employee[]>>
}

// Pagination State
export interface PaginationState {
  paginationtask: PaginationTask
  setpaginationtask: Dispatch<SetStateAction<PaginationTask>>
}
export interface projectfortask {
  projectfortask: Employee[]
  setprojectfortask: React.Dispatch<React.SetStateAction<Employee[]>>
}

// Combined Context State
export interface TaskContextState
  extends TaskState,
    TaskFilterState,
    TaskActions,
    UserTaskState,
    PaginationState {}
