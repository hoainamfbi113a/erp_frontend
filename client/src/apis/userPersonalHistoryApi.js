// import axiosUser from "./axios";
import axios from "axios"
const getListUserPersonalHistory = (params = {}) => {
    return axios.get(`${process.env.apiEmployee}/api/personalhistories`,params)
}
const deleteUserPersonalHistory = (id) => {
    return axios.delete(`${process.env.apiEmployee}/api/personalhistories/${id}`,)
}
const addUserPersonalHistory = (params) => {
    params.current_user_id = localStorage.getItem("current_user_id");
    return axios.post(`${process.env.apiEmployee}/api/personalhistories`, params)
}
const editUserPersonalHistory = (params) => {
    return axios.put(`${process.env.apiEmployee}/api/personalhistories/${params.id}`, params)
}
export {
    getListUserPersonalHistory,
    deleteUserPersonalHistory,
    addUserPersonalHistory,
    editUserPersonalHistory
}