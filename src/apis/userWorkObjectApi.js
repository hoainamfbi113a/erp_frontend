// import axiosUser from "./axios";
import axios from "axios"
const getListUserWorkObject = (params = {}) => {
    return axios.get("http://localhost:3000/work-objects",params)
}
const deleteUserWorkObject = (id) => {
    return axios.delete(`http://localhost:3000/work-objects/${id}`,)
}
const addUserWorkObject = (params) => {
    return axios.post("http://localhost:3000/work-objects", params)
}
const editUserWorkObject = (params) => {
    return axios.put(`http://localhost:3000/work-objects/${params.id}`, params)
}
export {
    getListUserWorkObject,
    deleteUserWorkObject,
    addUserWorkObject,
    editUserWorkObject
}