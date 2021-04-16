import express from "express";
import axios from "axios"
const router = express.Router();
router.get('/detail',async (req,res)=>{
    const config = {
        headers: { Authorization: req.headers.authorization },
      };
    let { data } = await axios.get(`${process.env.apiWorkflow}/api/workflow/detail?type_id=20`);
    res.send(data);
})
router.get('/get-workflow-types', async (req,res)=>{
  let { data } = await axios.get(`${process.env.apiWorkflow}/api/workflow/get-workflow-types`);
  res.status(204).json(data)
})
router.post('/store', async (req,res)=>{
  let { data } = await axios.post(`${process.env.apiWorkflow}/api/workflow/store`,req.body);
    res.send(data);
})


export default router;