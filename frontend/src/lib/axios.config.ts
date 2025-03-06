import axios from "axios";

// todo handle axios timeouts
const axiosInstance = axios.create({
  // baseURL: process.env.MODE === "development" ? "http://localhost:5000/" : "/api",
  baseURL: "http://localhost:5000/",
  timeout: 5000,
});

export default axiosInstance;
