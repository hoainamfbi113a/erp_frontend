// import axiosUser from "./axios";
import axios from "axios"
const getListUserDegree = (params = {}) => {
    return axios.get("https://employee.tuoitre.vn/api/user-degrees",params)
}
const deleteUserDegree = (id) => {
    return axios.delete(`https://employee.tuoitre.vn/api/user-degrees/${id}`,)
}
const addUserDegree = (params) => {
    params.current_user_id = localStorage.getItem("current_user_id");
    return axios.post("https://employee.tuoitre.vn/api/user-degrees", params)
}
const editUserDegree = (params) => {
    return axios.put(`https://employee.tuoitre.vn/api/user-degrees/${params.id}`, params)
}
const editUserDegreeGet = (id) => {
    return axios.get(`https://employee.tuoitre.vn/api/user-degrees/profiles/${id}`,)
}
export {
    getListUserDegree,
    deleteUserDegree,
    addUserDegree,
    editUserDegreeGet,
    editUserDegree
}