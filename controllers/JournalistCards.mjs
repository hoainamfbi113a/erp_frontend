import axios from "axios";
const addJournalistCards = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  console.log(req.body)
  let { data } = await axios.post(
    `${process.env.apiEmployee}/api/journalist-cards`,
    req.body,config
  );
  console.log(data)
  res.send(data);
};
const updateJournalistCards = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
    let id = req.params.id;
    let { data } = await axios.put(
      `${process.env.apiEmployee}/api/journalist-cards/${id}`,
      req.body,config
    );
    res.send(data);
  };
export { addJournalistCards, updateJournalistCards };
