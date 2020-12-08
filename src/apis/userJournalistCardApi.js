// import axiosUser from "./axios";
import axios from "axios"
const getListUserJournalistCard = (params = {}) => {
    return axios.get("http://192.168.61.116/api/journalist-cards",params)
}
const deleteUserJournalistCard = (id) => {
    return axios.delete(`http://192.168.61.116/api/journalist-cards/${id}`,)
}
const addUserJournalistCard = (params) => {
    return axios.post("http://192.168.61.116/api/journalist-cards", params)
}
const editUserJournalistCard = (params) => {
    console.log(params);
    return axios.put(`http://192.168.61.116/api/journalist-cards/${params.id}`, params)
}
const editUserJournalistCardGet = (id) => {
    return axios.get(`http://192.168.61.116/api/journalist-cards/${id}`,)
}
export {
    getListUserJournalistCard,
    deleteUserJournalistCard,
    addUserJournalistCard,
    editUserJournalistCard,
    editUserJournalistCardGet
}