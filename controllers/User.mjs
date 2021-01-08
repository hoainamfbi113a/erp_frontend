import axios from "axios"
const listUser = async (req,res) => {
    const config = {
        headers: { Authorization: req.headers.authorization }
    };
    let  {data}  = await axios.get(`${process.env.apiEmployee}/api/user`,config);
    res.send(data);
}
const inforUserById = async (req,res) => {
    const config = {
        headers: { Authorization: req.headers.authorization }
    };
    let { id } = req.params;
    let  {data}  = await axios.get(`${process.env.apiEmployee}/api/user/${id}`,config);
    res.send(data);
}
const listUserPagination = async (req,res) => {
    const {page} = req.query;
    const config = {
        headers: { Authorization: req.headers.authorization }
    };
    let  {data}  = await axios.get(`${process.env.apiEmployee}/api/user?order=asc&page=${page}`,config);
    res.send(data);
}
const login = async (req,res) => {
    await axios.post(`${process.env.apiEmployee}/api/login`, req.body)
    .then(err=>{
        res.send(err.data);
    })
    .catch(err=>{
        console.log("err:",err);
    })
    
}
const register = async (req,res) => {
    const config = {
        headers: { Authorization: req.headers.authorization }
    };
    let  {data}  = await axios.post(process.env.apiEmployee + "/api/register", req.body,config)
    res.send(data);
}
const grantRoleToUser = async (req,res) =>{
    const config = {
        headers: { Authorization: req.headers.authorization }
    };
    let {id} = req.params
    let { data } = await axios.post(`${process.env.apiEmployee}/api/user/role/${id}`,req.body,config)
    res.send(data);
}
const listRoleAndPermissionOfUser = async (req,res) =>{
    const config = {
        headers: { Authorization: req.headers.authorization }
    };
    let {id} = req.params
    let { data } = await axios.get(`${process.env.apiEmployee}/api/user/permission/${id}`,config);
    res.send(data);
}
const deleteRoleUser = async (req,res) =>{
    let { id } = req.params
    let { data } = await axios.delete(`${process.env.apiEmployee}/api/user/role/${id}`,{ data: req.body, headers: { "Authorization": req.headers.authorization} });
    res.send(data);
  }
const updateUser = async (req,res) =>{
    const config = {
        headers: { Authorization: req.headers.authorization }
    };
    let {id} = req.params
    let { data } = await axios.put(`${process.env.apiEmployee}/api/user/${id}`,req.body,config);
    console.log(data)
    res.send(data);
}
export {
    updateUser,
    inforUserById,
    login,
    register,
    listUser,
    deleteRoleUser,
    grantRoleToUser,
    listUserPagination,
    listRoleAndPermissionOfUser,
}