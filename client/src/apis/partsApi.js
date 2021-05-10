import axiosConfig from "./axios";
import { handleResponse } from "./handleResponse";
export const getListParts = (page, per_page) => {
  return axiosConfig
    .get(`/api/parts?page=${page}&per_page=${per_page}`)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err)
      return ({
          err:"error"
      })
    });
};
export const getListAllParts = (page) => {
  return axiosConfig
    .get(`/api/parts?page=all`)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err)
      return ({
          err:"error"
      })
    });
};

export const addParts = (params) =>{
    return axiosConfig
    .post(`/api/parts`,params)
    .then((data) =>{
        return data
    })
    .catch(err=>{
      console.log(err)
      return ({
          err:"error"
      })                                                                                                                   
    })
}

export const updateParts = (id, params) =>{
    return axiosConfig
    .put(`/api/parts/${id}`,params)
    .then(handleResponse)
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

export const deleteParts = (params) =>{
  return axiosConfig
  .post(`api/partsd`,params)
  .then(data=>{
      return data
  })
  .catch (err =>{
    console.log(err)
    return ({
        err:"error"
    })
  })
}
export const searchParts = (name, page, per_page) =>{
  return axiosConfig
  .get(`/api/search/parts?name=${name}&page=${page}&per_page=${per_page}`)
  .then((data) => {
      return data
  })
  .catch((err )=> {
      console.log(err);
      return ({
          err:"error"
      })
  })
}


