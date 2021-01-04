// import axios from "axios";
// const addDepartment = async (req, res) => {
//   const config = {
//     headers: { Authorization: req.headers.authorization }
//   };
//   let { data } = await axios.post(
//     `${process.env.apiEmployee}/api/departments`,
//     req.body,config
//   );
//   res.send(data);
// };
// const updateDepartment = async (req, res) => {
//   const config = {
//     headers: { Authorization: req.headers.authorization }
//   };
//   let id = req.params.id;
//   let { data } = await axios.put(
//     `${process.env.apiEmployee}/api/departments/${id}`,req.body,config
//   );
//   res.send(data);
// };
// export { addDepartment, updateDepartment };

import axios from "axios";
const listDepartment = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  let { data } = await axios.get(`${process.env.apiEmployee}/api/departments`,config);
  res.send(data);
};

const addDepartment = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  console.log(req.headers.authorization)
  console.log(req.body)
  let { data } = await axios.post(`${process.env.apiEmployee}/api/departments`,req.body,config);
  res.send(data);
};

const updateDepartment = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  let { id } = req.params;
  let { data } = await axios.put(`${process.env.apiEmployee}/api/departments/${id}`,req.body,config);
  res.send(data);
};

const deleteDepartment = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization }
  };
  let { id } = req.body;
  let { data } = await axios.delete(`${process.env.apiEmployee}/api/departments/${id}`,config);
  res.send(data);
};

export { listDepartment, addDepartment, updateDepartment, deleteDepartment };

