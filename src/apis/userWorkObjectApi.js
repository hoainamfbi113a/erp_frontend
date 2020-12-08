// import axiosUser from "./axios";
import axios from "axios"
const getListUserWorkObject = (params = {}) => {
    return axios.get("http://192.168.61.116/api/work-objects",params)
}
const deleteUserWorkObject = (id) => {
    return axios.delete(`http://192.168.61.116/api/work-objects/${id}`,)
}
const addUserWorkObject = (params) => {
    return axios.post("http://192.168.61.116/api/work-objects", params)
}
const editUserWorkObject = (params) => {
    return axios.put(`http://192.168.61.116/api/work-objects/${params.id}`, params)
}
const editUserWorkObjectGet = (id) => {
    return axios.get(`http://192.168.61.116/api/work-objects/${id}`)
}
export {
    getListUserWorkObject,
    deleteUserWorkObject,
    addUserWorkObject,
    editUserWorkObject,
    editUserWorkObjectGet
}