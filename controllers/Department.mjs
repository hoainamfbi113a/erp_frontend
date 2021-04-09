import axios from "axios";
import express from "express";
const router = express.Router();
router.get("/", async (req, res) => {
    try {
        const { page } = req.query;
        if(page == "all") {
            let { data } = await axios.get(`${process.env.apiEmployee}/api/departments?per_page=100`);
            res.send(data);
        } else {
            let { data } = await axios.get(`${process.env.apiEmployee}/api/departments?page=${page}`);
            res.send(data);
        }
    } catch (error) {
        console.log(error)
    }
});
// router.post("/", async (req, res) => {
//     const config = {
//         headers: { Authorization: req.headers.authorization },
//     };
//     let { data } = await axios.post(`${process.env.apiEmployee}/api/departments`, req.body, config);
//     res.send(data);
// });

// router.put("/:id", async (req, res) => {
//     const config = {
//         headers: { Authorization: req.headers.authorization },
//     };
//     let { id } = req.params;
//     // console.log("123")
//     // console.log(req.body)
//     let { data } = await axios.put(
//         `${process.env.apiEmployee}/api/departments/${id}`,
//         req.body,
//         config,
//     );
//     res.send(data);
// });

// router.post("/delete", async (req, res) => {
//     const { id } = req.body;
//     const config = {
//         headers: { Authorization: req.headers.authorization },
//     };
//     let { data } = await axios.delete(`${process.env.apiEmployee}/api/departments/${id}`, config);
//     res.send(data);
// });
router.get("/map", async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    let { data } = await axios.get(`${process.env.apiEmployee}/api/departments?per_page=30`, config);
    res.send(data);
});
export default router;
