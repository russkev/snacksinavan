import axios from "axios";
export const BASE_URL = process.env.REACT_APP_API_URL;

// Create axios instance
const VanAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
  },
  responseType: "json",
});

// Add interceptor for including authorization token
VanAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("vanToken");
    const vanName = localStorage.getItem("vanName");
    if (token && vanName) {
      config.headers.vanAuthorization = `Bearer ${token}`;
      config.headers.vanName = vanName;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default VanAPI;
