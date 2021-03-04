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
  let { data } = await axios.get(`${process.env.apiWorkflow}/api/workflow/get-workflow-types`);
    // console.log(data)
    res.send(data);
})
router.get('/detail', async (req,res)=>{


 
  try {
    const { type } = req.query;
    let { data, status } = await 
    // axios.get("http://192.168.61.117/api/workflow/detail?type=report")
    axios.get(`${process.env.apiWorkflow}/api/workflow/detail?type=${type}`);
    console.log(status)
    res.json(data);
  } catch (error) {
    console.log(error)
  }

})
router.post('/store', async (req,res)=>{
  let { data } = await axios.post(`${process.env.apiWorkflow}/api/workflow/store`,req.body);
    res.send(data);
})


export default router;