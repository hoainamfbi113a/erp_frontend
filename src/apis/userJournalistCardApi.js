// import axiosUser from "./axios";
import axios from "axios"
const getListUserJournalistCard = (params = {}) => {
    return axios.get(`${process.env.apiEmployee}/api/journalist-cards`,params)
}
const deleteUserJournalistCard = (id) => {
    return axios.delete(`h${process.env.apiEmployee}/api/journalist-cards/${id}?current_user_id=4`,)
}
const addUserJournalistCard = (params) => {
    params.current_user_id = localStorage.getItem("current_user_id");
    return axios.post("${process.env.apiEmployee}/api/journalist-cards", params)
}
const editUserJournalistCard = (params) => {
    params.current_user_id = localStorage.getItem("current_user_id");
    return axios.put(`${process.env.apiEmployee}/api/journalist-cards/${params.id}`, params)
}
const editUserJournalistCardGet = (id) => {
    return axios.get(`${process.env.apiEmployee}/api/journalist-cards/profiles/${id}?current_user_id=4`,)
}
export {
    getListUserJournalistCard,
    deleteUserJournalistCard,
    addUserJournalistCard,
    editUserJournalistCard,
    editUserJournalistCardGet
}