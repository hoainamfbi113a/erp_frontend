import axios from "axios";
import { config } from "../../helper/FuncHelpers.mjs";

const getFamilyRelation = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(
      `${process.env.apiEmployee}/api/family-relationship/users/${id}`,
      config(req)
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

const createFamilyRelation = async (req, res) => {
  try {
    const { data } = await axios.post(
      `${process.env.apiEmployee}/api/family-relationship`,
      req.body,
      config(req)
    );

    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

const deleteFamilyRelation = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const { data } = await axios.delete(
      `${process.env.apiEmployee}/api/family-relationship/${id}`,
      config(req)
    );
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
}

export { getFamilyRelation, createFamilyRelation, deleteFamilyRelation };
