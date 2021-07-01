import axios from "axios";
import { config } from "../../helper/FuncHelpers.mjs";

const getGoAbroad = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(
      `${process.env.apiEmployee}/api/go-abroad/users/${id}`,
      config(req)
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

const createGoAbroad = async (req, res) => {
  try {
    const { data } = await axios.post(
      `${process.env.apiEmployee}/api/go-abroad`,
      req.body,
      config(req)
    );

    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

const deleteGoAbroad = async (req, res) => {
  const { id } = req.params;
  try {
    const { data } = await axios.delete(
      `${process.env.apiEmployee}/api/go-abroad/${id}`,
      config(req)
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

const updateGoAbroad = async (req, res) => {
  const { id } = req.body;
  try {
    const { data } = await axios.put(
      `${process.env.apiEmployee}/api/go-abroad/${id}`,
      req.body,
      config(req)
    );
      res.send(data);
  } catch (error) {
    console.log(error);
  }
};

export { getGoAbroad, createGoAbroad, deleteGoAbroad, updateGoAbroad };
