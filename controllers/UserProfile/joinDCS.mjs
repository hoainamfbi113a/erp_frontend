import axios from "axios";

const getJoinDCS = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  const { id } = req.params;
  const { type } = req.query;
  try {
    const { data } = await axios.get(
      `${process.env.apiEmployee}/api/party/users/${id}`,
      config
    );
    res.send(data);
  } catch (error) {
    res.send("error")
  }
};

const createJoinDCS = async (req, res) => {
  console.log(req.body)
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  try {
    const { data } = await axios.post(
      `${process.env.apiEmployee}/api/party`,
      req.body,
      config
    );
    res.send(data);
  } catch (error) {
    // console.log("error",error)
  }

};
const deleteJoinDCS = async (req, res) => {
  const { id } = req.body;
  try {
    const data = await axios.delete(
      `${process.env.apiEmployee}/api/party/${id}`,
      { data: req.body, headers: { Authorization: req.headers.authorization } }
    );
    res.send(data.data);

  } catch (error) {
    res.send(error);
    // console.log(error);
  }
};

const updateJoinDCS = async (req, res) =>{
  const {id} = req.body;
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  console.log(req.body)
  try {
    const data = await axios.put(`${process.env.apiEmployee}/api/party/${id}`, req.body, config );
    res.send(data.data);
  } catch (error) {
    console.log(error)
  }
}
export { getJoinDCS, createJoinDCS, deleteJoinDCS, updateJoinDCS };