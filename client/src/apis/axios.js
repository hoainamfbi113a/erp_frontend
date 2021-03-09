import axios from "axios";
import docCookies from "doc-cookies"
// import {logout} from ""
const axiosConfig = axios.create({
  headers: {
    "content-type": "application/json",
  },
});
axiosConfig.interceptors.request.use(async (config) => {
  const token =  docCookies.getItem("usertoken");
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
    // window.location.href ="/404"
    throw error;
  }
);
export default axiosConfig;