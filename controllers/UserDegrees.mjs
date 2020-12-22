import axios from "axios";
const addUserDegrees = async (req, res) => {
  let { data } = await axios.post(
    `${process.env.apiEmployee}/api/user-degrees/?current_user_id=${req.body.user_id}`,
    req.body
  );
  res.send(data);
};
const updateUserDegrees = async (req, res) => {
    let { id } = req.body;
    let { user_id } = req.body;
    let { data } = await axios.post(
      `${process.env.apiEmployee}/api/user-degrees/${id}?current_user_id=${user_id}`,
      req.body
    );
    res.send(data);
  };
export { addUserDegrees, updateUserDegrees };
