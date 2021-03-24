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
  let {type_id} = req.query;
  try {
    let { data } = await axios.get(
      `${process.env.apiFormBuilder}/api/document-template/get?type_id=${type_id}`
    );
    res.send(data);
  } catch (error) {
    console.log(error)
  }
  
});
router.post("/document-template/store", async (req, res) => {
  try {
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
  let {id } = req.query;
  try {
    let { data } = await axios.get(
      `${process.env.apiFormBuilder}/api/document/get?id=${id}`
    );
    res.send(data);
  } catch (error) {
    console.log(error)
  }
  
});


router.get("/document/list", async (req, res) => {
  let {page,per_page,user_id } = req.query;
  try {
    let { data } = await axios.get(
      `${process.env.apiFormBuilder}/api/document/list?page=${page}&per_page=${per_page}&user_id=${user_id}`
    );
    res.send(data);
    console.log(data)
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
  console.log(req.body)
  try {
    let { data } = await axios.post(
      `${process.env.apiFormBuilder}/api/document/store`,
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



router.post("/document-type/store", async (req, res) => {
  try {
    let { data } = await axios.post(
      `${process.env.apiWorkflow}/api/document-type/store`,
      req.body
    );
    res.send(data);
  } catch (error) {
    console.log(error)
  }
 
});

router.delete("/document-type/delete", async (req, res) => {
  try {
    let { data } = await axios.delete(
      `${process.env.apiWorkflow}/api/document-type/delete`,
      req.body
    );
    res.send(data);
  } catch (error) {
    console.log(error)
  }
 
});

router.get("/document-process/get", async (req, res) => {
  let {process_id } = req.query;
  try {
    let { data } = await axios.get(
      `${process.env.apiFormBuilder}/api/document-process/get?process_id=${process_id}`
    );
    res.send(data);
    console.log(data)
  } catch (error) {
    console.log(error)
  }
});

export default router;
