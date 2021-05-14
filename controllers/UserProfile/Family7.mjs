import axios from "axios";

const getFamilyRelation = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  const { id } = req.params;
  const { data } = await axios.get(
    `${process.env.apiEmployee}/api/family-relationship/users/${id}`,
    config
  );
  res.send(data);
};

const createFamilyRelation = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  const { data } = await axios.post(
    `${process.env.apiEmployee}/api/family-relationship`,
    req.body,
    config
  );
  res.send(data);
};

export { getFamilyRelation, createFamilyRelation };
