import axios from "axios";
const addWorkObjects = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  let { data } = await axios.post(
    `${process.env.apiEmployee}/api/work-objects`,
    req.body,config
  );
  res.send(data);
};
const updateWorkObjects = async (req, res) => {
    const config = {
      headers: { Authorization: req.headers.authorization }
    };
    let { id } = req.params;
    let { data } = await axios.put(
      `${process.env.apiEmployee}/api/work-objects/${id}`,
      req.body,config
    );
    res.send(data);
  };
export { addWorkObjects, updateWorkObjects };
