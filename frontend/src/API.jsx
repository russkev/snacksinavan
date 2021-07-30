import axios from 'axios'
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Create axios instance
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json"
  },
  responseType: "json"
});

// Add interceptor for including authorization token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) {
      config.headers.authorization = `Bearer ${token}`;
      config.headers.username = username;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
