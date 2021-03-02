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
    // console.log(data)
    res.send(data);
  } catch (error) {
    console.log(error)
  }
  
});
router.post("/document-template/store", async (req, res) => {
  try {
    console.log(`${process.env.apiFormBuilder}/api/document-template/store`)
    let { data } = await axios.post(
      `${process.env.apiFormBuilder}/api/document-template/store`,
      req.body
    );
    res.send(data);
  } catch (error) {
    console.log(error)
  }
 
});
router.get("/document/get", async (req, res) => {
  try {
    let { data } = await axios.get(
      `${process.env.apiFormBuilder}/api/document/get`
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

router.get("/document/list", async (req, res) => {
  try {
    let { data } = await axios.get(
      `${process.env.apiFormBuilder}/api/document/list`
    );
    res.send(data);
  } catch (error) {
    console.log(error)
  }
});

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

router.post("/document/store", async (req, res) => {
  try {
    let { data } = await axios.post(
      `${process.env.apiWorkflow}/api/document/store`,
      req.body
    );
    res.send(data);
  } catch (error) {
    console.log(error)
  }
 
});

router.post("/api/document/update", async (req, res) => {
  try {
    let { data } = await axios.post(
      `${process.env.apiWorkflow}/api/document/update`,
      req.body
    );
    res.send(data);
  } catch (error) {
    console.log(error)
  }
 
});

router.delete("/api/document/delete", async (req, res) => {
  try {
    let { data } = await axios.delete(
      `${process.env.apiWorkflow}/api/document/delete`,
      req.body
    );
    res.send(data);
  } catch (error) {
    console.log(error)
  }
 
});

export default router;
