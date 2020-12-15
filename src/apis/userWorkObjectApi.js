// import axiosUser from "./axios";
import axios from "axios"
const getListUserWorkObject = (params = {}) => {
    return axios.get(`${process.env.apiEmployee}/api/work-objects`,params)
}
const deleteUserWorkObject = (id) => {
    return axios.delete(`${process.env.apiEmployee}/api/work-objects/${id}?current_user_id=4`,)
}
const addUserWorkObject = (params) => {
    params.current_user_id = localStorage.getItem("current_user_id");
    return axios.post(`${process.env.apiEmployee}/api/work-objects`, params)
}
const editUserWorkObject = (params) => {
    params.current_user_id = localStorage.getItem("current_user_id");
    return axios.put(`${process.env.apiEmployee}/api/work-objects/${params.id}`, params)
}
const editUserWorkObjectGet = (id) => {
    return axios.get(`${process.env.apiEmployee}/api/work-objects/profiles/${id}?current_user_id=4`)
}
export {
    getListUserWorkObject,
    deleteUserWorkObject,
    addUserWorkObject,
    editUserWorkObject,
    editUserWorkObjectGet
}