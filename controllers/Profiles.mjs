import Axios from "axios";

const getProfile = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  let { id } = req.body;
  let { data } = await Axios.get(
    `${process.env.apiEmployee}/api/fe/profiles/users/${id}`,config
  );
  res.send(data);
};
const updateProfile = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  let id = req.params.id
  let { data } = await Axios.put(
    `${process.env.apiEmployee}/api/profiles/${id}`,req.body,config
  );
  res.send(data);
};
const addProfile = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  let { data } = await Axios.post(
    `${process.env.apiEmployee}/api/profiles`,req.body,config
  );
  res.send(data);
};
export { getProfile, updateProfile, addProfile };
