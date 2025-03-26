import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "./apiUrls";

// Create an instance for public requests (does not require authentication)
export const publicInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Create an instance for private requests (requires authentication)
export const privateInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add an interceptor to the private instance to automatically include the Authorization header
privateInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
