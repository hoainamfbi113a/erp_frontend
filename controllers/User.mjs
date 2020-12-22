import axios from "axios"
const listUser = async (req,res) => {
    let  {data}  = await axios.get(`${process.env.apiEmployee}/api/user`)
    res.send(data);
}
const login = async (req,res) => {
    let  {data}  = await axios.post(`${process.env.apiEmployee}/api/login`, req.body);
    res.send(data);
}
const register = async (req,res) => {
    let  {data}  = await axios.post(process.env.apiEmployee + "/api/register", req.body)
    res.send(data);
}
export {
    login,
    register
}