// axios instance

export const BASE_URL = "https://upskilling-egypt.com:3003/api/v1";
export const IMAGE_URL = "https://upskilling-egypt.com:3003/";

//* USER AUTHENTICATION
export const AUTH_URLS = {
  LOGIN: `Users/Login`,
  REGISTER: `Users/Register`,
  VERIFY: `Users/Verify`,
  FORGET_PASSWORD: `Users/Reset/Request`,
  RESET_PASSWORD: `Users/Reset`,
  CHANGE_PASSWORD: `Users/ChangePassword`,
};

// TASKS_ENDPOINTS
const TASKS_URLS = {
  COUNT_TASKS: "Task/count",
  GET_ALL: `Task/manager`,
  ADD_TASK: `/Task`,
  GET_TASK: (id: number) => `/Task/${id}`,
  EDIT_TASK: (id: number) => `/Task/${id}`,
  DELETE_TASK: (id: number) => `/Task/${id}`,
  UPDATE_TASK: (id: number) => `/Task/${id}`,
  CHANGE_STATUS: (id: number) => `/Task/${id}/change-status`,
  GET_ASSIGNED_TASKS: `/Task`,
};

// USERS_ENDPOINTS
const USERS_URLS = {
  COUNT_USERS: "Users/count",
  FILTER_USERS: "Users/",
  CREATE_MANAGER: `Users/Create`,
  GET_USER_BY_ID: (id: number) => `Users/${id}`,
  TOGGLE_USER: (id: number) => `Users/${id}`,
  GET_USERS_BY_MANAGER: `Users/Manager/`,
  GET_ALL_USERS: `Users/`,
  GET_CURRENT_USER: `Users/currentUser`,
};

// PROJECTS_ENDPOINTS
export const PROJECTS_URLS = {
  LIST_MANAGER: "Project/manager",
  LIST_EMPLOYEE: "Project/employee",
  DELETE_PROJECT: (id: number) => `Project/${id}`,
  ADD_PROJECT: `/Project`,
  GET_PROJECT: (id: number) => `Project/${id}`,
  EDIT_PROJECT: (id: number) => `/Project/${id}`,
  GET_ALL_PROJECTS: `/Project/`,
};

export { TASKS_URLS, USERS_URLS };
