import axios from "axios";
import express from "express";
const router = express.Router();
router.post("/", async (req, res) => {
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    const {app_id, slug, user_id, per_page, page} = req.body;
    // console.log(req.body);
    // console.log(`${process.env.apiEmployee}/api/notifications/app/slug/user?app_id=${app_id}&slug=${slug}&user_id=${user_id}&per_page=${per_page}&page=${page}`)
    let { data } = await axios.get(`${process.env.apiEmployee}/api/notifications/app/slug/user?service_management_id=1&slug=${slug}&user_id=${2}&per_page=${per_page}&page=${page}`, config);
    console.log(data)
    res.send(data);
});
router.put("/status/:id", async (req,res)=>{
    const config = {
        headers: { Authorization: req.headers.authorization },
    };
    const { id } = req.params
    axios.put(`${process.env.apiEmployee}/api/notifications/status/${id}`,req.body,config)
    .then(response=>{
        res.send(response.data)
    })
    .catch(err=>{
        console.log(err);
    })
})
export default router;