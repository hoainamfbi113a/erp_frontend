import axiosConfig from "./axios";
import { handleResponse } from "./handleResponse";

export const checkPermission = (params) => {
  return axiosConfig
    .put(`/api/pokemon`, params)
    .then(handleResponse)
    .then((data) => {
      console.log(data)
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};