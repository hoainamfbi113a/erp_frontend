import express from "express";
import axios from "axios"
const router = express.Router();
router.get('/update-profile',async (req,res)=>{
    const config = {
        headers: { Authorization: req.headers.authorization },
      };
    let { data } = await axios.get(`${process.env.apiWorkflow}/api/workflow/detail?type=update_profile`);
    
    res.send(data);
})
export default router