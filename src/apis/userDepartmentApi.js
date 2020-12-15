// import axiosUser from "./axios";
import axios from "axios"
const getListUserDepartment = (params = {}) => {
    return axios.get(`${process.env.apiEmployee}/api/departments`,params)
}
const deleteUserDepartment = (id) => {
    return axios.delete(`${process.env.apiEmployee}/api/departments/${id}?current_user_id=4`,)
}
const addUserDepartment = (params) => {
    params.current_user_id = localStorage.getItem("current_user_id");
    return axios.post(`${process.env.apiEmployee}/api/departments`, params)
}
const editUserDepartment = (params) => {
    params.current_user_id = localStorage.getItem("current_user_id");
    return axios.put(`${process.env.apiEmployee}/api/departments/${params.id}`, params)
}
const editUserDepartmentGet = (id) => {
    return axios.get(`${process.env.apiEmployee}/api/departments/profiles/${id}?current_user_id=4`,)
}
export {
    getListUserDepartment,
    deleteUserDepartment,
    addUserDepartment,
    editUserDepartmentGet,
    editUserDepartment
}