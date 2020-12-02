// import axiosUser from "./axios";
import axios from "axios"
const getListUserDepartment = (params = {}) => {
    return axios.get("http://localhost:3000/departments",params)
}
const deleteUserDepartment = (id) => {
    return axios.delete(`http://localhost:3000/departments/${id}`,)
}
const addUserDepartment = (params) => {
    return axios.post("http://localhost:3000/departments", params)
}
const editUserDepartment = (params) => {
    return axios.put(`http://localhost:3000/departments/${params.id}`, params)
}
export {
    getListUserDepartment,
    deleteUserDepartment,
    addUserDepartment,
    editUserDepartment
}