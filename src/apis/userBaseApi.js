// import axiosUser from "./axios";
import axios from "axios"
const getListUserBase = (i) => {
    return axios.get(`https://employee.tuoitre.vn/api/profiles?page=${i}`)
    // return axios.get(`https://employee.tuoitre.vn/api/current-user`)

}
const deleteUserBase = (id) => {
    return axios.delete(`https://employee.tuoitre.vn/api/profiles/${id}`)
}
const addUserBase = (params) => {
    params.current_user_id = localStorage.getItem("current_user_id");
    return axios.post("https://employee.tuoitre.vn/api/profiles", params)
}
const editUserBase = (params) => {
    return axios.put(`https://employee.tuoitre.vn/api/profiles/${params.id}`, params)
}
const editUserBaseGet = (id) => {
    return axios.get(`https://employee.tuoitre.vn/api/profiles/${id}`)
}
export {
    getListUserBase,
    deleteUserBase,
    addUserBase,
    editUserBaseGet,
    editUserBase
}