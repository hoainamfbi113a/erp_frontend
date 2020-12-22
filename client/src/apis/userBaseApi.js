// import axiosUser from "./axios";
import axios from "axios"
const getListUserBase = (i) => {
    return axios.get(`/api/user`)
}
const deleteUserBase = (id) => {
    return axios.delete(`${process.env.apiEmployee}/api/profiles/${id}?current_user_id=4`)
}
const addUserBase = (params) => {
    params.current_user_id = localStorage.getItem("current_user_id");
    return axios.post(`${process.env.apiEmployee}/api/profiles`, params)

}
const editUserBase = (params) => {
    params.current_user_id = localStorage.getItem("current_user_id");
    return axios.put(`${process.env.apiEmployee}/api/profiles/${params.id}`, params)
}
const editUserBaseGet = (id) => {
    return axios.get(`process.env.apiEmployee/api/profiles/${id}?current_user_id=4`)
}
export {
    getListUserBase,
    deleteUserBase,
    addUserBase,
    editUserBaseGet,
    editUserBase
}