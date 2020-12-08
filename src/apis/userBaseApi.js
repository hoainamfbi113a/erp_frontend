// import axiosUser from "./axios";
import axios from "axios"
import api from './axios';
const getListUserBase = (params = {}) => {
    return axios.get("http://192.168.61.116/api/profiles?page=13",params)
}
const deleteUserBase = (id) => {
    return axios.delete(`http://192.168.61.116/api/profiles/${id}`)
}
const addUserBase = (params) => {
    return axios.post("http://192.168.61.116/api/profiles", params)
}
const editUserBase = (params) => {
    return axios.put(`http://192.168.61.116/api/profiles/${params.id}`, params)
}
const editUserBaseGet = (id) => {
    return axios.get(`http://192.168.61.116/api/profiles/${id}`)
}
export {
    getListUserBase,
    deleteUserBase,
    addUserBase,
    editUserBaseGet,
    editUserBase
}