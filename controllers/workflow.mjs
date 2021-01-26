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
router.get('/get-workflow-types', async (req,res)=>{
  let { data } = await axios.get(`https://workflow.tuoitre.vn/api/workflow/get-workflow-types`);
    
    res.send(data);
})
router.get('/detail', async (req,res)=>{
  const { type } = req.query;
  let { data } = await axios.get(`https://workflow.tuoitre.vn/api/workflow/detail?type=${type}`);
  res.send(data);
})
router.get('/store', async (req,res)=>{
  let { data } = await axios.get(`https://workflow.tuoitre.vn/api/workflow/store`);
    
    res.send(data);
})


export default router;