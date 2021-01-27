import axios from "axios";
const listPosition = async (req, res) => {
    const { page } = req.query;
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { data } = await axios.get(`${process.env.apiEmployee}/api/positions?page=${page}`, config);
    res.send(data);
};

const addPosition = async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { data } = await axios.post(`${process.env.apiEmployee}/api/positions`, req.body, config);
    res.send(data);
};

const updatePosition = async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { id } = req.params;
    let { data } = await axios.put(
        `${process.env.apiEmployee}/api/positions/${id}`,
        req.body,
        config,
    );
    res.send(data);
};

const deletePosition = async (req, res) => {
    const { id } = req.body;
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { data } = await axios.delete(`${process.env.apiEmployee}/api/positions/${id}`, config);
    res.send(data);
};

const addPermissionForPos = async (req, res) => {
    const { id } = req.params;
    const config = {
        headers: { Authorization: req.headers.authorization },
    };

    try {
        const data = await axios.post(
            `${process.env.apiEmployee}/api/position/permission/${id}`,
            req.body,
            config,
        );
        res.send(data.data);
    } catch (error) {
        res.send(error);
    }
};
const deletePermissionForPos = async (req, res) => {
    const { id } = req.params;
    const config = {
        headers: { Authorization: req.headers.authorization },
    };

    try {
        const data = await axios.delete(
            `${process.env.apiEmployee}/api/position/permission/${id}`,
            { data: req.body, headers: { Authorization: req.headers.authorization } },
        );
        res.send(data.data);
    } catch (error) {
        res.send(error);
    }
};

export {
    listPosition,
    addPosition,
    updatePosition,
    deletePosition,
    addPermissionForPos,
    deletePermissionForPos,
};
