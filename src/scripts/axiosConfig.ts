import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;