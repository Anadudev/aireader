import axios from "axios";

// todo handle axios timeouts
const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/"
      : "https://aireader.onrender.com/",
  // baseURL: "http://localhost:5000/",
  timeout: 5000,
});

export default axiosInstance;
