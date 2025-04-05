import { privateInstance } from './apiConfig';
import { USERS_URLS } from './apiUrls';

export const UsersData = async () => {
  try {
    const response = await privateInstance.get(USERS_URLS.COUNT_USERS);
    return response.data;
  } catch (error) {
    console.error("Error fetching users data:", error);
    throw error;
  }
};
