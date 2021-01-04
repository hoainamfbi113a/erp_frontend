import axios from "axios";
const listAction = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  let { data } = await axios.get(`${process.env.apiEmployee}/api/action`, config);
  res.send(data);
};

const addAction = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  let { data } = await axios.post(
    `${process.env.apiEmployee}/api/action`,req.body,
    config
  );
  res.send(data);
};

const updateAction = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  let { id } = req.params;
  let { data } = await axios.put(
    `${process.env.apiEmployee}/api/action/${id}`,req.body,
    config
  );
  res.send(data);
};

const deleteAction = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  let { id } = req.body;
  let { data } = await axios.put(
    `${process.env.apiEmployee}/api/action/${id}`,
    config
  );
  res.send(data);
};
export { listAction, addAction, updateAction, deleteAction };
