import axios from "axios";
const addProfileDepartments = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  let { data } = await axios.post(
    `${process.env.apiEmployee}/api/profiles/departments`,
    req.body,config
  );
  res.send(data);
};
const updateProfileDepartments = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  let id = req.params.id;
  let { data } = await axios.put(
    `${process.env.apiEmployee}/api/profiles/departments/${id}`,req.body,config
  );
  res.send(data);
};
export { addProfileDepartments, updateProfileDepartments };


