// import axiosUser from "./axios";
import axios from "axios"
const getListUserBase = (params = {}) => {
    return axios.get("http://192.168.61.116/profiles",params)
}
const deleteUserBase = (id) => {
    return axios.delete(`http://192.168.61.116/profiles/${id}`,)
}
const addUserBase = (params) => {
    return axios.post("http://192.168.61.116/profiles", params)
}
const editUserBase = (params) => {
    return axios.put(`http://192.168.61.116/profiles/${params.id}`, params)
}
export {
    getListUserBase,
    deleteUserBase,
    addUserBase,
    editUserBase
}