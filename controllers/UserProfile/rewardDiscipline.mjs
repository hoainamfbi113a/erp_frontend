import axios from "axios";

const getReward = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  const { id } = req.params;
  try {
    const { data } = await axios.get(
      `${process.env.apiEmployee}/api/reward-discipline/users/${id}`,
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

export { getReward, createReward };