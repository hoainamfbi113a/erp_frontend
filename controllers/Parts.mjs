import axios from "axios";
const listParts = async (req, res) => {
    const { page } = req.query;
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { data } = await axios.get(`${process.env.apiEmployee}/api/parts?page=${page}`, config);
    res.send(data);
};

const addParts = async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { data } = await axios.post(`${process.env.apiEmployee}/api/parts`, req.body, config);
    res.send(data);
};

const updateParts = async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { id } = req.params;
    let { data } = await axios.put(`${process.env.apiEmployee}/api/parts/${id}`, req.body, config);
    res.send(data);
};

const deleteParts = async (req, res) => {
    const { id } = req.body;
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { data } = await axios.delete(`${process.env.apiEmployee}/api/parts/${id}`, config);
    res.send(data);
};

export { listParts, addParts, updateParts, deleteParts };
