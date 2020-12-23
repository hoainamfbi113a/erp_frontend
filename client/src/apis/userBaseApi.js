import axios from "axios"
const getListUserBase = (i) => {
    const config = {
        headers: { Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZW1wbG95ZWUudHVvaXRyZS52bi9hcGkvbG9naW4iLCJpYXQiOjE2MDg2OTQ3NTMsImV4cCI6MTYwOTI5OTU1MywibmJmIjoxNjA4Njk0NzUzLCJqdGkiOiJlakI4eFdIZUtDVFl4bEVyIiwic3ViIjo0LCJwcnYiOiI5MDRmNmQyZDg3MjVmMmM1YjQ5OGJhODVjOTlhMThkY2JjZmMyZDg1In0.IYcIYLLKfftvLP2Wa8bGY90EdM8qy5kQxDJGbfdzmaQ` }
    };
    
    return axios.get(`/api/user`,config)
}
const deleteUserBase = (id) => {
    return axios.delete(`${process.env.apiEmployee}/api/profiles/${id}?current_user_id=4`)
}
const addUserBase = (params) => {
    params.current_user_id = localStorage.getItem("current_user_id");
    return axios.post(`${process.env.apiEmployee}/api/profiles`, params)

}
const editUserBase = (params) => {
    params.current_user_id = localStorage.getItem("current_user_id");
    return axios.put(`${process.env.apiEmployee}/api/profiles/${params.id}`, params)
}
const editUserBaseGet = (id) => {
    return axios.get(`process.env.apiEmployee/api/profiles/${id}?current_user_id=4`)
}
export {
    getListUserBase,
    deleteUserBase,
    addUserBase,
    editUserBaseGet,
    editUserBase
}
