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
    .post(`/api/positions`)
    .then(handleResponse)
    .then((data) =>{
        return data
    })
    .catch(err=>{
        console.log(err)
    })
}

// export const updatePosition = (params) =>{
//     return axiosConfig
//     .post(`/api/pos`)
// }



