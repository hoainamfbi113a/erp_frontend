import axiosConfig from "./axios";
const getListRole = () =>{
    return axiosConfig.get(`/api/role`);
}
export {
    getListRole,
}