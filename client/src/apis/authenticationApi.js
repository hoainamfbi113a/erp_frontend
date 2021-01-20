import axios from "axios";
import docCookies from "doc-cookies";
import axiosConfig from "./axios";
import { handleResponse } from './handleResponse';
export const login = (params) => {
  return axios
    .post("/api/login", params)
    .then((res) => {
      if (res.data.message === "Đăng nhập thành công!") {
        docCookies.setItem("usertoken", res.data.access_token, 1000);
        docCookies.setItem("user_id", res.data.detail.id, 1000);
        docCookies.setItem("email", res.data.detail.email, 1000);
      }
      return res.data;
    })
    .catch((err) => {
      console.log(err)
      return {
        error: "error",
      };
    });
};
export const getPermissionUser = (id) => {
  console.log("123")
  return axiosConfig
    .get(`/api/user/permission/${id}`)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return {
        error: "error",
      };
    });
};

export const logout = () => {
  docCookies.removeItem("usertoken");
  docCookies.removeItem("user_id");
  docCookies.removeItem("email");
};
