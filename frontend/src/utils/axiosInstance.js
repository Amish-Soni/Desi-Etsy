import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`, // adjust if needed
  withCredentials: true, // Important for cookie-based auth
});

export default axiosInstance;
