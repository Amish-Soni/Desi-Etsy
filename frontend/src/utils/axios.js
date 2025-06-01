import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: true, // for cookies
});

export default API;
