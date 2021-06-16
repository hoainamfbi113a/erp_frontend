import axiosConfig from "./axios";
export const addJournalistCards = (paramsJournalistCards) =>{
    return axiosConfig
    .post(`/api/journalist-cards`, paramsJournalistCards)
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

export const updateJournalistCards = (id,params) =>{
    return axiosConfig
    .put(`/api/journalist-cards/${id}`, params)
    .catch(err=>{
        console.log(err);
        return ({
            err:"error"
        })
    })
}