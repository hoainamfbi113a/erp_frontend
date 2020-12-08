// import axiosUser from "./axios";
import axios from "axios"
const getListUserWorkObject = (params = {}) => {
    return axios.get("https://employee.tuoitre.vn/api/work-objects",params)
}
const deleteUserWorkObject = (id) => {
    return axios.delete(`https://employee.tuoitre.vn/api/work-objects/${id}`,)
}
const addUserWorkObject = (params) => {
    return axios.post("https://employee.tuoitre.vn/api/work-objects", params)
}
const editUserWorkObject = (params) => {
    return axios.put(`https://employee.tuoitre.vn/api/work-objects/${params.id}`, params)
}
const editUserWorkObjectGet = (id) => {
    return axios.get(`https://employee.tuoitre.vn/api/work-objects/profiles/${id}`)
}
export {
    getListUserWorkObject,
    deleteUserWorkObject,
    addUserWorkObject,
    editUserWorkObject,
    editUserWorkObjectGet
}