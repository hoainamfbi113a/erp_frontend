import axiosConfig from "./axios";
import { handleResponse } from "./handleResponse";
export const getProfile = (id) =>{
    return axiosConfig.post(`/api/fe/profiles/user`, {
        id,
      })
    .then(data=>{
        return data;
    })
    .catch(err=>{
        console.log(err)
    })
}

export const addProfile = (params) =>{
    return axiosConfig
    .post(`/api/Pokemon`, params)
    .then(data=>{
        return data;
    })
    .catch(err=>{
        console.log(err);
    })
}

export const updateProfile = (proId, params) =>{
    return axiosConfig
    .put(`/api/profiles/${proId}`, params)
    .then(data=>{
        return data
    })
    .catch(err=>{
        console.log(err);
    })
}
