import axios from "axios";
const addJournalistCards = async (req, res) => {
  let { data } = await axios.post(
    `${process.env.apiEmployee}/api/journalist-cards/?current_user_id=${req.body.user_id}`,
    req.body
  );
  res.send(data);
};
const updateJournalistCards = async (req, res) => {
    let { id } = req.body;
    let { user_id } = req.body;
    let { data } = await axios.post(
      `${process.env.apiEmployee}/api/journalist-cards/${id}?current_user_id=${user_id}`,
      req.body
    );
    res.send(data);
  };
export { addJournalistCards, updateJournalistCards };
