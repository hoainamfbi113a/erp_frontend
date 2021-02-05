import axios from "axios";
import docCookies from "doc-cookies";
import axiosConfig from "./axios";
import { handleResponse } from './handleResponse';
export const login = (params) => {
  return axios
    .post("/api/login", params)
    .then((res) => {
      if (res.data.message === "Đăng nhập thành công!") {
        docCookies.setItem("usertoken", res.data.access_token, 2000);
        docCookies.setItem("user_id", res.data.detail.id, 2000);
        docCookies.setItem("email", res.data.detail.email, 2000);
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
export const slugPermission = () =>{
  return axiosConfig
  .get(`/api/service-management/slug/list`)
  .then((data) =>{
    return data
  })
  .catch((err)=>{
    return {
      error: "error",
    }
  })
}
export const getUser = (id) =>{
  return axiosConfig
  .get(`/api/user/${id}`)
  .then((data)=>{
    return data
  })
  .catch(err=>{
    return {
      error:"error"
    }
  })
}
export const getUserApi = (id) =>{
  return axiosConfig
  .get(`/api/user/${id}`)
  .then((data)=>{
    return data
  })
  .catch(err=>{
    return {
      error:"error"
    }
  })
}
export const updateUser = (id, params) =>{
  return axiosConfig
  .put(`/api/user/${id}`, params)
  .then(data=>{
    return data
  })
  .catch(err=>{
    console.log(err)
    return ({
      err:"error"
    })
  })
  
}
export const register = (paramUser) =>{
  return axiosConfig
  .post("/api/register", paramUser)
  .then((data)=>{
    return data
  })
  .catch(err=>{
    return {
      error:"error"
    }
  })
}
export const listUser = (pagination) =>{
  return axiosConfig
  .get(`/api/userpagin?page=${pagination}`)
  .then(data=>{
    return data
  })
  .catch(err=>{
    console.log(err);
    return ({
      err:"error"
    })
  })
}
export const logout = () => {
  document.cookie = "usertoken" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.cookie = "user_id" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.cookie = "email" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  localStorage.removeItem("0")
};
