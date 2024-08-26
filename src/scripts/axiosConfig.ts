import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://ubuntu.koyeb.app",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;