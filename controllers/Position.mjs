import axios from "axios";
const listPosition = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  let { data } = await axios.get(`${process.env.apiEmployee}/api/positions`,config);
  res.send(data);
};

const addPosition = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  let { data } = await axios.post(`${process.env.apiEmployee}/api/positions`,req.body,config);
  res.send(data);
};

const updatePosition = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  let { id } = req.params;
  let { data } = await axios.put(`${process.env.apiEmployee}/api/positions/${id}`,req.body,config);
  res.send(data);
};

const deletePosition = async (req, res) => {
  const {id} = req.body
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  let { data } = await axios.delete(`${process.env.apiEmployee}/api/positions/${id}`,config);
  res.send(data);
};

export { listPosition, addPosition, updatePosition, deletePosition };
