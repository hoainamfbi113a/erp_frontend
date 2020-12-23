import axios from "axios";
import queryString from "query-string";

const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosConfig.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("usertoken");
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
});
axiosConfig.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosConfig;
