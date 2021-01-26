import express from "express";
import axios from "axios"
const router = express.Router();
router.get('/get-action-target-types', async (req,res)=>{
    let { data } = await axios.get(`https://workflow.tuoitre.vn/api/step/get-action-target-types`);
    res.send(data);
  })
  router.get('/get-action-types', async (req,res)=>{
    let { data } = await axios.get(`https://workflow.tuoitre.vn/api/step/get-action-types`);
      res.send(data);
  })

export default router;