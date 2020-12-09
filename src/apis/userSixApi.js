// import axiosUser from "./axios";
import axios from "axios"
const getListUserBase = (params = {}) => {
    return axios.get("https://employee.tuoitre.vn/profiles",params)
}
const deleteUserBase = (id) => {
    return axios.delete(`https://employee.tuoitre.vn/profiles/${id}`,)
}
const addUserBase = (params) => {
    params.current_user_id = localStorage.getItem("current_user_id");
    return axios.post("https://employee.tuoitre.vn/profiles", params)
}
const editUserBase = (params) => {
    return axios.put(`https://employee.tuoitre.vn/profiles/${params.id}`, params)
}
export {
    getListUserBase,
    deleteUserBase,
    addUserBase,
    editUserBase
}