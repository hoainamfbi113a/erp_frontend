import axios from "axios";
const listRole = async (req, res) => {
  let { data } = await axios.get(`${process.env.apiEmployee}/api/role`);
  res.send(data);
};

const addRole = async (req, res) => {
  let { data } = await axios.post(`${process.env.apiEmployee}/api/role`);
  res.send(data);
};

const updateRole = async (req, res) => {
  let { id } = req.body;
  let { data } = await axios.put(`${process.env.apiEmployee}/api/role/${id}`);
  res.send(data);
};

const deleteRole = async (req, res) => {
  let { id } = req.body;
  let { data } = await axios.put(`${process.env.apiEmployee}/api/role/${id}`);
  res.send(data);
};
export { listRole, addRole, updateRole, deleteRole };
