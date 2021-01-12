import axios from "axios";
import express from "express";
const router = express.Router();
router.get('/user',async (req,res)=>{
    const config = {
        headers: { Authorization: req.headers.authorization },
      };
      let { data } = await axios.get(`${process.env.apiEmployee}/api/user`, config);
      res.send(data);
})
router.get("/user/:id", async (req,res)=>{
    const config = {
        headers: { Authorization: req.headers.authorization },
      };
      let { id } = req.params;
      let { data } = await axios.get(
        `${process.env.apiEmployee}/api/user/${id}`,
        config
      );
      res.send(data);
})
router.get("/userpagin",async (req,res)=>{
    const { page } = req.query;
    const config = {
      headers: { Authorization: req.headers.authorization },
    };
    let { data } = await axios.get(
      `${process.env.apiEmployee}/api/user?order=asc&page=${page}`,
      config
    );
    res.send(data);
})

router.post('/login',async (req,res)=>{
    await axios
    .post(`${process.env.apiEmployee}/api/login`, req.body)
    .then((err) => {
      res.send(err.data);
    })
    .catch((err) => {
      console.log("err:", err);
    });
})
router.post('/register', async (req,res)=>{
    const config = {
        headers: { Authorization: req.headers.authorization },
      };
      let { data } = await axios.post(
        process.env.apiEmployee + "/api/register",
        req.body,
        config
      );
      res.send(data);
})
router.post("/user/role/:id",async (req,res)=>{
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
})
router.get("/user/permission/:id",async (req,res)=>{
    const config = {
        headers: { Authorization: req.headers.authorization },
      };
      let { id } = req.params;
      let { data } = await axios.get(
        `${process.env.apiEmployee}/api/user/permission/${id}`,
        config
      );
      res.send(data);
})

router.post("/user/role-user/:id", async (req,res)=>{
    let { id } = req.params;
    let {
      data,
    } = await axios.delete(`${process.env.apiEmployee}/api/user/role/${id}`, {
      data: req.body,
      headers: { Authorization: req.headers.authorization },
    });
    res.send(data);
})

router.put("/user/:id", async (req,res)=>{
    const config = {
        headers: { Authorization: req.headers.authorization },
      };
      let { id } = req.params;
      let { data } = await axios.put(
        `${process.env.apiEmployee}/api/user/${id}`,
        req.body,
        config
      );
      res.send(data)
})

export default router;
