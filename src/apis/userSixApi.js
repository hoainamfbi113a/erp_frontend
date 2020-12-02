// import axiosUser from "./axios";
import axios from "axios"
const getListUserBase = (params = {}) => {
    return axios.get("http://localhost:3000/user-base",params)
}
const deleteUserBase = (id) => {
    return axios.delete(`http://localhost:3000/user-base/${id}`,)
}
const addUserBase = (params) => {
    return axios.post("http://localhost:3000/user-base", params)
}
const editUserBase = (params) => {
    return axios.put(`http://localhost:3000/user-base/${params.id}`, params)
}
export {
    getListUserBase,
    deleteUserBase,
    addUserBase,
    editUserBase
}