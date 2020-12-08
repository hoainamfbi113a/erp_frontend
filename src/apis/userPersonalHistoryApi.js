// import axiosUser from "./axios";
import axios from "axios"
const getListUserPersonalHistory = (params = {}) => {
    return axios.get("http://192.168.61.116/api/personalhistories",params)
}
const deleteUserPersonalHistory = (id) => {
    return axios.delete(`http://192.168.61.116/api/personalhistories/${id}`,)
}
const addUserPersonalHistory = (params) => {
    return axios.post("http://192.168.61.116/api/personalhistories", params)
}
const editUserPersonalHistory = (params) => {
    return axios.put(`http://192.168.61.116/api/personalhistories/${params.id}`, params)
}
export {
    getListUserPersonalHistory,
    deleteUserPersonalHistory,
    addUserPersonalHistory,
    editUserPersonalHistory
}