import axios from "axios";
const addDepartment = async (req, res) => {
  let { data } = await axios.post(
    `${process.env.apiEmployee}/api/departments/?current_user_id=${req.body.user_id}`,
    req.body
  );
  res.send(data);
};
const updateDepartment = async (req, res) => {
  let { id } = req.body;
  let { user_id } = req.body;
  let { data } = await axios.post(
    `${process.env.apiEmployee}/api/departments/${id}?current_user_id=${user_id}`,
    req.body
  );
  res.send(data);
};
export { addDepartment, updateDepartment };
