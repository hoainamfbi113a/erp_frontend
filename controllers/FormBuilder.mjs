import express from "express";
import axios from "axios"
const router = express.Router();
router.get("/document-type/get-document-types", async (req, res) => {
  try {
    let { data } = await axios.get(
      `${process.env.apiFormBuilder}/api/document-type/get-document-types`
    );
    res.send(data);
  } catch (error) {
    console.log(error)
  }
  
});
router.get("/document-template/get", async (req, res) => {
  try {
    let { data } = await axios.get(
      `${process.env.apiFormBuilder}/api/document-template/get`
    );
    res.send(data);
  } catch (error) {
    console.log(error)
  }
  
});
router.post("/document-template/store", async (req, res) => {
  try {
    let { data } = await axios.post(
      `${process.env.apiWorkflow}/api/document-template/store`,
      req.body
    );
    res.send(data);
  } catch (error) {
    console.log(error)
  }
 
});

export default router;
