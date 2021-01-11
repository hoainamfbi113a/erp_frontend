import express from "express";
const router = express.Router();
router.get('/detail?type=update_profile',async (req,res)=>{
    const config = {
        headers: { Authorization: req.headers.authorization },
      };
    let { data } = await axios.get(`${process.env.apiWorkflow}/api/user/workflow/detail?type=update_profile`, config);
    res.send(data);
})
export default router