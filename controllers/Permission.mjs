import axios from "axios";
const listPermission = async (req, res) => {
    const { page } = req.query;
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { data } = await axios.get(
        `${process.env.apiEmployee}/api/permission?page=${page}`,
        config,
    );
    res.send(data);
};
const listTableId = async (req, res) => {
    const { id } = req.params;
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { data } = await axios.get(
        `${process.env.apiEmployee}/api/service-management/table-management/${id}`,
        config,
    );
    res.send(data);
};

const addPermission = async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    // console.log(req.body)
    // console.log("123")
    // let { data } = await axios.post(`${process.env.apiEmployee}/api/permission`, req.body, config);
    // console.log(data);
    // res.send(data);
};

const updatePermission = async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { id } = req.params;
    let { data } = await axios.put(
        `${process.env.apiEmployee}/api/permission/${id}`,
        req.body,
        config,
    );
    res.send(data);
};

const deletePermission = async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { id } = req.body;
    let { data } = await axios.delete(`${process.env.apiEmployee}/api/permission/${id}`, config);
    res.send(data);
};
const existPermission = async (req, res) => {
    // console.log("123")
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let {id } = req.params;
    // console.log(id)
    let { data } = await axios.get(`${process.env.apiEmployee}/api/list/permission/work-formality/${id}`, config);
    // console.log(data)
    res.send(data);
}
const addPermissionToPermission = async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { id, permissions } = req.body;
    let { data } = await axios.post(`${process.env.apiEmployee}/api/work-formality/permission/${id}`, {permissions}, config);
    res.send(data);
};
const deletePermissionToPermission = async (req, res) => {
    let { id, permissions } = req.body;
    let { data } = await axios.delete(`${process.env.apiEmployee}/api/work-formality/permission/${id}`, {
        data: {permissions} ,
        headers: { Authorization: req.headers.authorization },
      });
    res.send(data);
};
export {listTableId, listPermission, addPermission, updatePermission, deletePermission, existPermission, addPermissionToPermission, deletePermissionToPermission };
