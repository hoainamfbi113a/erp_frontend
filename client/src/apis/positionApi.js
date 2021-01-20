import axiosConfig from "./axios";
import { handleResponse } from "./handleResponse";
export const getListPosition = (page) => {
  return axiosConfig
    .get(`/api/positions?page=${page}`)
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

export const addPosition = (params) =>{
    return axiosConfig
    .post(`/api/positions`,params)
    .then(handleResponse)
    .then((data) =>{
        return data
    })
    .catch(err=>{
        console.log(err)
    })
}

export const updatePosition = (params, id) =>{
    return axiosConfig
    .put(`/api/positions/${id}`,params)
    .then(data=>{
        return data
    })
    .catch(err=>{
        console.log(err);
    })
}

export const deletePosition = (params) =>{
    return axiosConfig
    .post(`/api/positionsd`,params)
    .then(data=>{
        return data
    })
    .catch (err =>{
        console.log(err);
    })
}


