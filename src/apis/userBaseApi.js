// import axiosUser from "./axios";
import axios from "axios"
const getListUserBase = (i) => {
    // return axios.get(`https://employee.tuoitre.vn/api/profiles?page=${i}`)
    return axios.get(`http://employee.tuoitre.vn/api/user`)
}
const deleteUserBase = (id) => {
    return axios.delete(`https://employee.tuoitre.vn/api/profiles/${id}?current_user_id=4`)
}
const addUserBase = (params) => {
    params.current_user_id = localStorage.getItem("current_user_id");
    return axios.post("https://employee.tuoitre.vn/api/profiles", params)

}
const editUserBase = (params) => {
    params.current_user_id = localStorage.getItem("current_user_id");
    return axios.put(`https://employee.tuoitre.vn/api/profiles/${params.id}`, params)
}
const editUserBaseGet = (id) => {
    return axios.get(`https://employee.tuoitre.vn/api/profiles/${id}?current_user_id=4`)
}
export {
    getListUserBase,
    deleteUserBase,
    addUserBase,
    editUserBaseGet,
    editUserBase
}