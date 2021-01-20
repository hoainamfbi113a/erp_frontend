import axiosConfig from "./axios";
import { handleResponse } from "./handleResponse";
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

export const addDepartment = (params) =>{
    return axiosConfig
    .post(`/api/departments`,params)
    .then(handleResponse)
    .then((data) =>{
        return data
    })
    .catch(err=>{
        console.log(err)
    })
}

export const updateDepartment = (params, id) =>{
    return axiosConfig
    .put(`/api/departments/${id}`,params)
    .then(handleResponse)
    .then(data=>{
        return data
    })
    .catch(err=>{
        console.log(err);
    })
}

export const deleteDepartment = (params) =>{
    return axiosConfig
    .post(`/api/departments/delete`,params)
    .then(handleResponse)
    .then(data=>{
        return data
    })
    .catch (err =>{
        console.log(err);
    })
}



