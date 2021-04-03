import { data } from "jquery";
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
        console.log(err);
        return ({
            err:"error"
        })
    });
};
export const getListAllPosition = (page) => {
  return axiosConfig
    .get(`/api/positions?page=all`)
    .then(handleResponse)
    .then((data) => {
      return data;
    })
    .catch((err) => {
        console.log(err);
        return ({
            err:"error"
        })
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
        console.log(err);
        return ({
            err:"error"
        })
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
        return ({
            err:"error"
        })
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
        return ({
            err:"error"
        })
    })
}

export const searchPosition = name =>{
    return axiosConfig
    .get(`/api/search/positions?name=${name}&per_page=10`)
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



