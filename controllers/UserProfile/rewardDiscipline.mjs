import axios from "axios";

const getReward = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  const { id } = req.params;
  const { type } = req.query;
  try {
    const { data } = await axios.get(
      `${process.env.apiEmployee}/api/reward-discipline/users/${id}?type=${type}`,
      config
    );
    res.send(data);
  } catch (error) {
    res.send("error")
  }

};

const createReward = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  try {
    console.log(req.body)
    const { data } = await axios.post(
      `${process.env.apiEmployee}/api/reward-discipline`,
      req.body,
      config
    );
    console.log(data)
    res.send(data);
  } catch (error) {
    // console.log("error",error)
  }

};
const deleteReward = async (req, res) => {
  const { id } = req.body;
  try {
    const data = await axios.delete(
      `${process.env.apiEmployee}/api/reward-discipline/${id}`,
      { data: req.body, headers: { Authorization: req.headers.authorization } }
    );
    res.send(data.data);

  } catch (error) {
    res.send(error);
    // console.log(error);
  }
};

const updateReward = async (req, res) =>{
  const {id} = req.body;
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  console.log(req.body)
  try {
    const data = await axios.put(`${process.env.apiEmployee}/api/reward-discipline/${id}`, req.body, config );
    res.send(data.data);
  } catch (error) {
    console.log(error)
  }
}
export { getReward, createReward, deleteReward, updateReward };