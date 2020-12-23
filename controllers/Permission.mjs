import axios from "axios";
const listPermission = async (req, res) => {
  let { data } = await axios.get(`${process.env.apiEmployee}/api/permission`);
  res.send(data);
};

const addPermission = async (req, res) => {
  let { data } = await axios.post(`${process.env.apiEmployee}/api/permission`);
  res.send(data);
};

const updatePermission = async (req, res) => {
  let { id } = req.body;
  let { data } = await axios.put(`${process.env.apiEmployee}/api/permission/${id}`);
  res.send(data);
};

const deletePermission = async (req, res) => {
  let { id } = req.body;
  let { data } = await axios.put(`${process.env.apiEmployee}/api/permission/${id}`);
  res.send(data);
};
export { listPermission, addPermission, updatePermission, deletePermission };
