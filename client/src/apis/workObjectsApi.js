import axiosConfig from "./axios";
export const addWorkObject = (paramsWorkObject) =>{
    return axiosConfig
    .post(`/api/work-objects`, paramsWorkObject)
    .then(data=>{
        return data;
    })
    .catch(err=>{
        console.log(err);
        return ({
            err:"error"
        })
    })
}
export const updateWorkObject = (id, params) =>{
    return axiosConfig
    .put(`/api/work-objects/${id}`, params)
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