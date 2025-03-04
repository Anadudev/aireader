import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: process.env.MODE === "development" ? "http://localhost:5000/" : "/api",
  baseURL: "http://localhost:5000/",
});

export default axiosInstance;
