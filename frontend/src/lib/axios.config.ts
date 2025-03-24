import axios from "axios";

// todo handle axios timeouts
// todo handle slow internat detection
const axiosInstance = axios.create({
  baseURL: "https://aireader.onrender.com/",
  // baseURL: "http://localhost:5000/",
  timeout: 5000,
  withCredentials: true,
});

export default axiosInstance;
