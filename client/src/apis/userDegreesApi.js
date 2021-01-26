import axiosConfig from "./axios";
export const addUserDegrees = (paramsUserDegrees) =>{
    return axiosConfig
    .post(`/api/user-degrees`, paramsUserDegrees)
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
export const updateUserDegree = (idUserDegree, paramsUserDegree) =>{
    return axiosConfig
    .put(`/api/user-degrees/${idUserDegree}`, paramsUserDegree)
    .catch(err=>{
        console.log(err);
        return ({
            err:"error"
        })
    })
}