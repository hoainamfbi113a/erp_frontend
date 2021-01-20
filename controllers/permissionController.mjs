import axios from "axios";
import express from "express";
const router = express.Router();
router.get("/", async (req, res) => {
    const { page } = req.query;
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { data } = await axios.get(`${process.env.apiEmployee}/api/permission?page=${page}`, config);
    res.send(data);
});
router.post("/", async (req, res) => {
    console.log(req.body)
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { data } = await axios.post(`${process.env.apiEmployee}/api/permission`, req.body, config);
    res.send(data);
});

router.put("/:id", async (req, res) => {
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
});

router.post("/delete", async (req, res) => {
    const { id } = req.body;
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { data } = await axios.delete(`${process.env.apiEmployee}/api/permission/${id}`, config);
    res.send(data);
});
export default router;
