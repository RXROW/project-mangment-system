import { privateInstance } from './apiConfig';
import { TASKS_URLS } from './apiUrls';

export const TasksData = async () => {
  try {
    const response = await privateInstance.get(TASKS_URLS.COUNT_TASKS);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks data:", error);
    throw error;
  }
};
