import axiosConfig from "./axios";
import { handleResponse } from "./handleResponse";
export const getListDepartment = (page, per_page) => {
  return axiosConfig
    .get(`/api/departments?page=${page}&per_page=${per_page}`)
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

export const searchDepartment = (name, page, per_page) => {
  return axiosConfig
    .get(`/api/search/departments?name=${name}&page=${page}&per_page=${per_page}`)
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
