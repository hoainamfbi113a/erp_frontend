// import axiosUser from "./axios";
import axios from "axios"
const getListUserBase = (params = {}) => {
    return axios.get(`${process.env.apiEmployee}/profiles`,params)
}
const deleteUserBase = (id) => {
    return axios.delete(`${process.env.apiEmployee}/profiles/${id}`,)
}
const addUserBase = (params) => {
    params.current_user_id = localStorage.getItem("current_user_id");
    return axios.post(`${process.env.apiEmployee}/profiles`, params)
}
const editUserBase = (params) => {
    return axios.put(`${process.env.apiEmployee}/profiles/${params.id}`, params)
}
export {
    getListUserBase,
    deleteUserBase,
    addUserBase,
    editUserBase
}