// import axiosUser from "./axios";
import axios from "axios"
const getListUserJournalistCard = (params = {}) => {
    return axios.get("http://localhost:3000/journalist-cards",params)
}
const deleteUserJournalistCard = (id) => {
    return axios.delete(`http://localhost:3000/journalist-cards/${id}`,)
}
const addUserJournalistCard = (params) => {
    return axios.post("http://localhost:3000/journalist-cards", params)
}
export {
    getListUserJournalistCard,
    deleteUserJournalistCard,
    addUserJournalistCard
}