import axiosConfig from "./axios";
import { handleResponse } from "./handleResponse";
export const getListPermission = (page) => {
  return axiosConfig
    .get(`/api/permission?page=${page}`)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return {
        err: "error",
      };
    });
};

export const addPermission = (params) =>{
    return axiosConfig
    .post("/api/permission", params)
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

export const updatePermission = (id, params) =>{
    return axiosConfig
    .put(`/api/permission/${id}`, params)
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
export const allPermission = () =>{
    return axiosConfig
    .get("/api/permission/positions/except")
    .then(data=>{
        return data;
    })
    .catch(err=>{
        console.log(err)
        return ({
            err:"error"
        })
    })
}
// export const deletePosition = (params) =>{
//     return axiosConfig
//     .post(`/api/positionsd`,params)
//     .then(data=>{
//         return data
//     })
//     .catch (err =>{
//         console.log(err);
//     })
// }
