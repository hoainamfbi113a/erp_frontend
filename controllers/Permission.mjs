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

const addPermission = async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { data } = await axios.post(`${process.env.apiEmployee}/api/permission`, req.body, config);
    res.send(data);
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

export { listPermission, addPermission, updatePermission, deletePermission };
