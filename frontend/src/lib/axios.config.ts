import axios from "axios";

// todo handle axios timeouts
// todo handle slow internat detection
const axiosInstance = axios.create({
  baseURL:
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://aireader.onrender.com/",
  timeout: 5000,
  withCredentials: true,
});

export default axiosInstance;
