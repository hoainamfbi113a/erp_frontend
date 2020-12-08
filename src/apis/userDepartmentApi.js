// import axiosUser from "./axios";
import axios from "axios"
const getListUserDepartment = (params = {}) => {
    return axios.get("http://192.168.61.116/api/departments",params)
}
const deleteUserDepartment = (id) => {
    return axios.delete(`http://192.168.61.116/api/departments/${id}`,)
}
const addUserDepartment = (params) => {
    console.log(params);
    return axios.post("http://192.168.61.116/api/departments", params)
}
const editUserDepartment = (params) => {
    return axios.put(`http://192.168.61.116/api/departments/${params.id}`, params)
}
const editUserDepartmentGet = (id) => {
    return axios.get(`http://192.168.61.116/api/departments/${id}`,)
}
export {
    getListUserDepartment,
    deleteUserDepartment,
    addUserDepartment,
    editUserDepartmentGet,
    editUserDepartment
}