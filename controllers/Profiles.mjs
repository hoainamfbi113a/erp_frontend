import Axios from "axios";
const profiles = async (req, res) => {
  let { data } = await Axios.put(
    `${process.env.apiEmployee}/api/profiles/${req.params.id}`,
    params
  );
  res.send(data);
};
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
  console.log(req.body)
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  let id = req.params.id
  console.log(`${id}`)
  let { data } = await Axios.put(
    `${process.env.apiEmployee}/api/profiles/${id}`,req.body,config
  );
  res.send(data);
};
export { profiles, getProfile, updateProfile };
