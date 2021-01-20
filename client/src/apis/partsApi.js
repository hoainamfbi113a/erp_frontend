import axiosConfig from "./axios";
import { handleResponse } from "./handleResponse";
export const getListParts = (page) => {
  return axiosConfig
    .get(`/api/parts?page=${page}`)
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

export const addParts = (params) =>{
    return axiosConfig
    .post(`/api/parts`)
    .then(handleResponse)
    .then((data) =>{
        return data
    })
    .catch(err=>{
        console.log(err)                                                                                                                                 
    })
}

export const updateParts = (params, id) =>{
    return axiosConfig
    .post(`/api/parts/${id}`)
    .then(data=>{
        return data
    })
    .catch(err=>{
        console.log(err);
    })
}

export const deleteParts = (params) =>{
  return axiosConfig
  .post(`api/partsd`,params)
  .then(data=>{
      return data
  })
  .catch (err =>{
      console.log(err);
  })
}



