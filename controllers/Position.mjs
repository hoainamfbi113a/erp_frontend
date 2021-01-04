import axios from "axios";
const listPosition = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  let { data } = await axios.get(`${process.env.apiEmployee}/api/position`,config);
  res.send(data);
};

const addPosition = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  console.log(req.headers.authorization)
  console.log(req.body)
  let { data } = await axios.post(`${process.env.apiEmployee}/api/position`,req.body,config);
  res.send(data);
};

const updatePosition = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  let { id } = req.params;
  let { data } = await axios.put(`${process.env.apiEmployee}/api/position/${id}`,req.body,config);
  res.send(data);
};

const deletePosition = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  let { id } = req.body;
  let { data } = await axios.delete(`${process.env.apiEmployee}/api/position/${id}`,config);
  res.send(data);
};

export { listPosition, addPosition, updatePosition, deletePosition };
