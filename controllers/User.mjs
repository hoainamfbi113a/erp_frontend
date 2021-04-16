import axios from "axios";
import express from "express";
const router = express.Router();
router.get("/user", async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  let { data } = await axios.get(`${process.env.apiEmployee}/api/profiles`, config);
  res.send(data);
});
router.get("/user/:id", async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  let { id } = req.params;
  let { data } = await axios.get(
    `${process.env.apiEmployee}/api/user/${id}`,
    config
  );
  res.send(data);
});
router.get("/userpagin", async (req, res) => {
  console.log("123")
  const { page } = req.query;
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  if (page ==='all') {
    let { data } = await axios.get(
      `${process.env.apiEmployee}/api/profiles?order=asc&page=1&per_page=80`,
      config
    );
    res.send(data);
  } else {
    let { data } = await axios.get(
      `${process.env.apiEmployee}/api/profiles?order=asc&page=${page}`,
      config
    );
    res.send(data);
  }
});

router.post("/login", async (req, res) => {
  await axios
    .post(`${process.env.apiEmployee}/api/login`, req.body)
    .then((err) => {
      res.send(err.data);
    })
    .catch((err) => {
      console.log("err:", err);
    });
});
router.post("/register", async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  let { data } = await axios.post(
    process.env.apiEmployee + "/api/register",
    req.body,
    config
  );
  res.send(data);
});
router.post("/user/role/:id", async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  let { id } = req.params;
  let { data } = await axios.post(
    `${process.env.apiEmployee}/api/user/role/${id}`,
    req.body,
    config
  );
  res.send(data);
});
router.get("/user/permission/:id", async (req, res) => {
  try {
    const config = {
      headers: { Authorization: req.headers.authorization },
    };
    let { id } = req.params;
    let { data } = await axios.get(
      `${process.env.apiEmployee}/api/user/permission/${id}`,
      config
    );
    res.send(data);
  } catch (error) {
  }
});

router.post("/user/role-user/:id", async (req, res) => {
  let { id } = req.params;
  let { data } = await axios.delete(
    `${process.env.apiEmployee}/api/user/role/${id}`,
    {
      data: req.body,
      headers: { Authorization: req.headers.authorization },
    }
  );
  res.send(data);
});

router.put("/user/:id", async (req, res) => {

  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  let { id } = req.params;
  let { data } = await axios.put(
    `${process.env.apiEmployee}/api/user/${id}`,
    req.body,
    config
  );
  res.send(data);
});


router.get('/document-type/get-document-types',async (req,res)=>{
  const config = {
      headers: { Authorization: req.headers.authorization },
    };
  let { data } = await axios.get(`${process.env.apiFormBuilder}/api/document-type/get-document-types`);
  res.send(data);
})
router.get('/document-type/get',async (req,res)=>{
  const config = {
      headers: { Authorization: req.headers.authorization },
    };
  let { data } = await axios.get(`${process.env.apiFormBuilder}/api/document-type/get`);
  res.set('etag', 'strong')
  res.status(204).json(data);
})
router.get('/workflow/detail',async (req,res)=>{
  const config = {
      headers: { Authorization: req.headers.authorization },
    };
  let {type_id } = req.query;
  let  {data, status}  = await axios.get(`${process.env.apiWorkflow}/api/workflow/detail?type_id=${type_id}`);
  if(status == 204) {
    res.status(204).send()
  } else {
      res.send(data);
  }
})

router.post('/issue/store', async (req,res)=>{
  let { data } = await axios.post(`${process.env.apiWorkflow}/api/issue/store`,req.body);
    res.send(data);
})
router.post('/document-process/store', async (req,res)=>{
  let { data } = await axios.post(`${process.env.apiFormBuilder}/api/document-process/store`,req.body);
    res.send(data);
})
router.get('/list/actions/dep/pos/tab',async (req,res)=>{
  const config = {
      headers: { Authorization: req.headers.authorization },
    };
  let { data } = await axios.get(`${process.env.apiEmployee}/api/list/actions/dep/pos/tab`,config);
  res.send(data);
})


export default router;
