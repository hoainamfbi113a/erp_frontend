import axios from "axios";
import express from "express";
const router = express.Router();
router.get("/", async (req, res) => {
    try {
        const { page, per_page } = req.query;
        if(page == "all") {
            let { data } = await axios.get(`${process.env.apiEmployee}/api/departments?per_page=100`);
            res.send(data);
        } else {
            let { data } = await axios.get(`${process.env.apiEmployee}/api/departments?page=${page}&per_page=${per_page}`);
            res.send(data);
        }
    } catch (error) {
        console.log(error)
    }
});
router.get("/map", async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { data } = await axios.get(`${process.env.apiEmployee}/api/departments?per_page=30`, config);
    res.send(data);
});
export default router;
