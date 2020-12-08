// import axiosUser from "./axios";
import axios from "axios"
const getListUserDegree = (params = {}) => {
    return axios.get("http://192.168.61.116/api/user-degrees",params)
}
const deleteUserDegree = (id) => {
    return axios.delete(`http://192.168.61.116/api/user-degrees/${id}`,)
}
const addUserDegree = (params) => {
    return axios.post("http://192.168.61.116/api/user-degrees", params)
}
const editUserDegree = (params) => {
    return axios.put(`http://192.168.61.116/api/user-degrees/${params.id}`, params)
}
const editUserDegreeGet = (id) => {
    return axios.get(`http://192.168.61.116/api/user-degrees/${id}`,)
}
export {
    getListUserDegree,
    deleteUserDegree,
    addUserDegree,
    editUserDegreeGet,
    editUserDegree
}