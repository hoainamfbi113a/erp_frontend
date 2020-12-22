// import axiosUser from "./axios";
import axios from "axios"
const getListUser = (params = {}) => {
    return axios.get("http://localhost:3000/users",params)
}
const deleteUser = (id) => {
    return axios.delete(`http://localhost:3000/users/${id}`,)
}
const addUser = (params) => {
    return axios.post("http://localhost:3000/users", params)
}
export {
    getListUser,
    deleteUser,
    addUser
}