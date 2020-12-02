// import axiosUser from "./axios";
import axios from "axios"
const getListUserPersonalHistory = (params = {}) => {
    return axios.get("http://localhost:3000/personalhistories",params)
}
const deleteUserPersonalHistory = (id) => {
    return axios.delete(`http://localhost:3000/personalhistories/${id}`,)
}
const addUserPersonalHistory = (params) => {
    return axios.post("http://localhost:3000/personalhistories", params)
}
const editUserPersonalHistory = (params) => {
    return axios.put(`http://localhost:3000/personalhistories/${params.id}`, params)
}
export {
    getListUserPersonalHistory,
    deleteUserPersonalHistory,
    addUserPersonalHistory,
    editUserPersonalHistory
}