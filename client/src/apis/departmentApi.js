import axiosConfig from "./axios";
import { handleResponse } from "./handleResponse";
import { checkApi } from "apis/authenticationApi"
export const getListDepartment = (page) => {
  return axiosConfig
    .get(`/api/departments?page=${page}`)
    .then(handleResponse)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return {
        error: "error",
      };
    });
};
export const getListAllDepartment = (page) => {
  return axiosConfig
    .get(`/api/departments?page=all`)
    .then(handleResponse)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return {
        error: "error",
      };
    });
};

export const getListIdDepartment = () => {
  return axiosConfig
    .get(`/api/departments?per_page=30`)
    .then(handleResponse)
    .then((data) => {
      console.log(data)
      return data;
    })
    .catch((err) => {
      return {
        error: "error",
      };
    });
};

export const searchDepartment = (name) => {
  return axiosConfig
    .get(`/api/search/departments?name=${name}&per_page=10`)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return {
        err: "error",
      };
    });
};
export const addDepartmentProfile = (params) => {
  return axiosConfig
    .post(`/api/profiles/departments`, params)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return {
        err: "error",
      };
    });
};
export const updateDepartmentProfile = (pro_id, params) => {
  return axiosConfig
    .put(`/api/profiles/departments/${pro_id}`, params)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return {
        err: "error",
      };
    });
};
