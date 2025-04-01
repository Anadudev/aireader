import axios from "axios";

// todo handle axios timeouts
// todo handle slow internat detection
const axiosInstance = axios.create({
  baseURL:
    process.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://aireader.onrender.com/",
  timeout: 5000,
  withCredentials: true,
});

export default axiosInstance;
