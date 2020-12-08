// import axiosUser from "./axios";
import axios from "axios"
import api from './axios';
const getListUserBase = (params = {}) => {
    return axios.get("https://employee.tuoitre.vn/api/profiles?page=14",params)
}
const deleteUserBase = (id) => {
    return axios.delete(`https://employee.tuoitre.vn/api/profiles/${id}`)
}
const addUserBase = (params) => {
    return axios.post("https://employee.tuoitre.vn/api/profiles", params)
}
const editUserBase = (params) => {
    return axios.put(`https://employee.tuoitre.vn/api/profiles/${params.id}`, params)
}
const editUserBaseGet = (id) => {
    return axios.get(`https://employee.tuoitre.vn/api/profiles/${id}`)
}
export {
    getListUserBase,
    deleteUserBase,
    addUserBase,
    editUserBaseGet,
    editUserBase
}