import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Log the request path
    console.log("Request Path:", config.url);
    if (
      !["/signin", "/signup", "/mockInvite", "/forgotPassword"].includes(
        config.url
      )
    ) {
      console.log("Request Path:", config.url);
      if (config.token) {
        console.log("Request Token", config.token);
        config.headers.Authorization = `${config.token}`;
      }
    }
    return config;
  },
  (error) => {
    // Log error
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
