// import axiosUser from "./axios";
import axios from "axios"
const getListUserJournalistCard = (params = {}) => {
    return axios.get("hhttps://employee.tuoitre.vn/api/journalist-cards",params)
}
const deleteUserJournalistCard = (id) => {
    return axios.delete(`hhttps://employee.tuoitre.vn/api/journalist-cards/${id}`,)
}
const addUserJournalistCard = (params) => {
    console.log(params)
    return axios.post("hhttps://employee.tuoitre.vn/api/journalist-cards", params)
}
const editUserJournalistCard = (params) => {
    console.log(params);
    return axios.put(`hhttps://employee.tuoitre.vn/api/journalist-cards/${params.id}`, params)
}
const editUserJournalistCardGet = (id) => {
    return axios.get(`hhttps://employee.tuoitre.vn/api/journalist-cards/profiles/${id}`,)
}
export {
    getListUserJournalistCard,
    deleteUserJournalistCard,
    addUserJournalistCard,
    editUserJournalistCard,
    editUserJournalistCardGet
}