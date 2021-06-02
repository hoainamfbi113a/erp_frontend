import axios from "axios";
import { config } from "../../helper/FuncHelpers.mjs";

const getPersonalHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(
      `${process.env.apiEmployee}/api/personal-histories/users/${id}`,
      config(req)
    );
    console.log(id, data);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

const createPersonalHistory = async (req, res) => {
  try {
    const { data } = await axios.post(
      `${process.env.apiEmployee}/api/personal-histories`,
      req.body,
      config(req)
    );

    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

const deletePersonalHistory = async (req, res) => {
  const { id } = req.params;
  try {
    const { data } = await axios.delete(
      `${process.env.apiEmployee}/api/personal-histories/${id}`,
      config(req)
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

const updatePersonalHistory = async (req, res) => {
  const { id } = req.body;
  try {
    const { data } = await axios.put(
      `${process.env.apiEmployee}/api/personal-histories/${id}`,
      req.body,
      config(req)
    );
      res.send(data);
  } catch (error) {
    console.log(error);
  }
};

export { getPersonalHistory, createPersonalHistory, deletePersonalHistory, updatePersonalHistory };
