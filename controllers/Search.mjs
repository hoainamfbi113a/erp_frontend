import express from "express";
import axios from "axios";
const router = express.Router();

router.get("/departments", async (req, res) => {
  const { name, page, per_page } = req.query;
  const url = encodeURI(`name=${name}&page=${page}&per_page=${per_page}`);
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  let { data } = await axios.get(
    `${process.env.apiEmployee}/api/search/departments?${url}`,
    config
  );
  res.send(data);
});

router.get("/positions", async (req, res) => {
  const { name, page, per_page } = req.query;
  const url = encodeURI(`name=${name}&page=${page}&per_page=${per_page}`);
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  let { data } = await axios.get(
    `${process.env.apiEmployee}/api/search/positions?${url}`,
    config
  );
  res.send(data);
});

router.get("/parts", async (req, res) => {
  const { name, page, per_page } = req.query;
  const url = encodeURI(`name=${name}&page=${page}&per_page=${per_page}`);
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  let { data } = await axios.get(
    `${process.env.apiEmployee}/api/search/parts?${url}`,
    config
  );
  res.send(data);
});

router.get("/users", async (req, res) => {
  const { full_name, page, per_page } = req.query;
  const url = encodeURI(
    `full_name=${full_name}&page=${page}&per_page=${per_page}`
  );
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  let { data } = await axios.get(
    `${process.env.apiEmployee}/api/profiles?${url}`,
    config
  );
  res.send(data);
});

export default router;
