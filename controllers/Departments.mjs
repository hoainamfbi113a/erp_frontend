import axios from "axios";
const addDepartments = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  let { data } = await axios.post(
    `${process.env.apiEmployee}/api/departments`,
    req.body,config
  );
  res.send(data);
};
const updateDepartments = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  let id = req.params.id;
  let { data } = await axios.put(
    `${process.env.apiEmployee}/api/departments/${id}`,req.body,config
  );
  res.send(data);
};
export { addDepartments, updateDepartments };


