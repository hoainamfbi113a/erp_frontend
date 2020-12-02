// import axiosUser from "./axios";
import axios from "axios"
const getListUserBase = (params = {}) => {
    return axios.get("http://localhost:3000/profiles",params)
}
const deleteUserBase = (id) => {
    return axios.delete(`http://localhost:3000/profiles/${id}`,)
}
const addUserBase = (params) => {
    return axios.post("http://localhost:3000/profiles", params)
}
const editUserBase = (params) => {
    return axios.put(`http://localhost:3000/profiles/${params.id}`, params)
}
export {
    getListUserBase,
    deleteUserBase,
    addUserBase,
    editUserBase
}