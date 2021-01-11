import express from "express";
import axios from "axios"
const router = express.Router();
router.get('/update-profile',async (req,res)=>{
    console.log("123")
    const config = {
        headers: { Authorization: req.headers.authorization },
      };
      console.log(`${process.env.apiWorkflow}/api/workflow/detail?type=update_profile`)
    let { data } = await axios.get(`${process.env.apiWorkflow}/api/workflow/detail?type=update_profile`);
    
    res.send(data);
})
export default router