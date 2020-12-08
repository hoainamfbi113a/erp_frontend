// import axiosUser from "./axios";
import axios from "axios"
const getListUserDepartment = (params = {}) => {
    return axios.get("hhttps://employee.tuoitre.vn/api/departments",params)
}
const deleteUserDepartment = (id) => {
    return axios.delete(`hhttps://employee.tuoitre.vn/api/departments/${id}`,)
}
const addUserDepartment = (params) => {
    return axios.post("hhttps://employee.tuoitre.vn/api/departments", params)
}
const editUserDepartment = (params) => {
    return axios.put(`hhttps://employee.tuoitre.vn/api/departments/${params.id}`, params)
}
const editUserDepartmentGet = (id) => {
    return axios.get(`hhttps://employee.tuoitre.vn/api/departments/profiles/${id}`,)
}
export {
    getListUserDepartment,
    deleteUserDepartment,
    addUserDepartment,
    editUserDepartmentGet,
    editUserDepartment
}