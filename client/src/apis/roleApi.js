import axiosConfig from "./axios";
const getListRole = (page, per_page) =>{
    return axiosConfig.get(`/api/role?page=${page}&per_page=${per_page}`);
}
export {
    getListRole,
}