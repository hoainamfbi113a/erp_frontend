import axiosConfig from "./axios";
export const updateStatusNotify = (id, params)=>{
    return axiosConfig
    .put(`/api/notifications/status/${id}`,params)
    .then(data=>{
        return data
    })
    .catch(err=>{
        console.log(err);
        return ({
            err:"error"
        })
    }
    )
}
export const listNotify = (params) =>{
    return axiosConfig
    .post("/api/notifications", params)
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