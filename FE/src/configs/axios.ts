// src/utils/axios.ts (hoặc axiosConfig.ts)
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Thay bằng URL API thật
  timeout: 10000, // 10s
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: Gắn token tự động nếu có
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor: Xử lý lỗi response chung
instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
