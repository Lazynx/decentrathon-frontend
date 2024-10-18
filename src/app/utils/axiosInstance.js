import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://spirality-backend-production.up.railway.app/api`, // Make sure this matches your backend base URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
