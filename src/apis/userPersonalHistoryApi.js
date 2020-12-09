// import axiosUser from "./axios";
import axios from "axios"
const getListUserPersonalHistory = (params = {}) => {
    return axios.get("https://employee.tuoitre.vn/api/personalhistories",params)
}
const deleteUserPersonalHistory = (id) => {
    return axios.delete(`https://employee.tuoitre.vn/api/personalhistories/${id}`,)
}
const addUserPersonalHistory = (params) => {
    params.current_user_id = localStorage.getItem("current_user_id");
    return axios.post("https://employee.tuoitre.vn/api/personalhistories", params)
}
const editUserPersonalHistory = (params) => {
    return axios.put(`https://employee.tuoitre.vn/api/personalhistories/${params.id}`, params)
}
export {
    getListUserPersonalHistory,
    deleteUserPersonalHistory,
    addUserPersonalHistory,
    editUserPersonalHistory
}