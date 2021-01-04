import axios from "axios";
const addUserDegrees = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  let { data } = await axios.post(
    `${process.env.apiEmployee}/api/user-degrees`,
    req.body,config
  );
  res.send(data);
};
const updateUserDegrees = async (req, res) => {
    const config = {
      headers: { Authorization: req.headers.authorization }
    };
    let { id } = req.params;
    let { data } = await axios.put(
      `${process.env.apiEmployee}/api/user-degrees/${id}`,
      req.body,config
    );
    res.send(data);
  };
export { addUserDegrees, updateUserDegrees };
