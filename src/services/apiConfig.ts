
import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "./apiUrls";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

// headers
export const HEADERS = {
  headers: { Authorization: localStorage.getItem("token") },
};

// axios interceptors
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
