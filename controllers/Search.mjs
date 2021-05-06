import express from "express";
import axios from "axios";
const router = express.Router();

router.get("/departments", async (req, res) => {
    const { name, page } = req.query;
    const url = encodeURI(`name=${name}&page=${page}&per_page=10`);
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { data } = await axios.get(
        `${process.env.apiEmployee}/api/search/departments?${url}`,
        config,
    );
    res.send(data);
});

router.get("/positions", async (req, res) => {
    const { name, page } = req.query;
    const url = encodeURI(`name=${name}&page=${page}&per_page=10`);
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { data } = await axios.get(
        `${process.env.apiEmployee}/api/search/positions?${url}`,
        config,
    );
    res.send(data);
});

router.get("/parts", async (req, res) => {
    const { name, page } = req.query;
    const url = encodeURI(`name=${name}&page=${page}&per_page=10`);
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { data } = await axios.get(
        `${process.env.apiEmployee}/api/search/parts?${url}`,
        config,
    );
    res.send(data);
});

export default router;
