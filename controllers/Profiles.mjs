import Axios from "axios";
const profiles = async (req, res) => {
  let current_user_id = req.body.current_user_id;
  let { data } = await Axios.put(
    `${process.env.apiEmployee}/api/profiles/${req.params.id}?current_user_id=${current_user_id}`,
    params
  );
  res.send(data);
};
const getProfile = async (req, res) => {
  let { id } = req.body;
  let { data } = await Axios.get(
    `${process.env.apiEmployee}/api/fe/profiles/users/${id}?current_user_id=${id}`
  );
  res.send(data);
};
const updateProfile = async (req, res) => {
  let { id } = req.body;
  let { data } = await Axios.put(
    `${process.env.apiEmployee}/api/profiles/${id}`
  );
  console.log(data)
  res.send(data);
};
export { profiles, getProfile, updateProfile };
