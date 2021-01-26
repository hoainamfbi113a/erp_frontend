import axiosConfig from "./axios";
import { handleResponse } from "./handleResponse";
export const getListParts = (page) => {
  return axiosConfig
    .get(`/api/parts?page=${page}`)
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
    .post(`/api/parts`)
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
    .post(`/api/parts/${id}`)
    .then(data=>{
        return data
    })
    .catch(err=>{
      console.log(err)
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
export const searchParts =(dep_id, name) =>{
  return axiosConfig
  .get(`/api/search/parts/departments?name=${name}&per_page=10&dep_id=${dep_id}`)
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


