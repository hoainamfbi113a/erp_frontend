import axios from "axios";
import express from "express";
const router = express.Router();
router.get("/slug/list", async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { data } = await axios.get(`${process.env.apiEmployee}/api/service-management/slug/list`, config);
    res.send(data);
});
export default router;
