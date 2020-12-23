import axios from "axios";
const addWorkObjects = async (req, res) => {
  let { data } = await axios.post(
    `${process.env.apiEmployee}/api/work-objects/?current_user_id=${req.body.user_id}`,
    req.body
  );
  res.send(data);
};
const updateWorkObjects = async (req, res) => {
    let { id } = req.body;
    let { user_id } = req.body;
    let { data } = await axios.post(
      `${process.env.apiEmployee}/api/work-objects/${id}?current_user_id=${user_id}`,
      req.body
    );
    res.send(data);
  };
export { addWorkObjects, updateWorkObjects };
