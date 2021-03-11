import axios from "axios";
const listRole = async (req, res) => {
  const { page } = req.query;
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  let { data } = await axios.get(
    `${process.env.apiEmployee}/api/permission/departments/positions/list`,
    config
  );
  res.send(data);
};
const listPermissionAction = async (req, res) => {
  try {
    const config = {
        headers: { Authorization: req.headers.authorization },
      };
    let { data } = await axios.get(
      `http://employee.tuoitre.vn/api/list/permission/actions`,
      config
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

const addRole = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  let { data } = await axios.post(
    `${process.env.apiEmployee}/api/role`,
    req.body,
    config
  );
  res.send(data);
};

const updateRole = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  let { id } = req.params;
  let { data } = await axios.put(
    `${process.env.apiEmployee}/api/role/${id}`,
    req.body,
    config
  );
  res.send(data);
};

const deleteRole = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  let { id } = req.body;
  let { data } = await axios.put(
    `${process.env.apiEmployee}/api/role/${id}`,
    config
  );
  res.send(data);
};
const listPermissionOfRole = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  let { id } = req.params;
  let { data } = await axios.get(
    `${process.env.apiEmployee}/api/role/permission/${id}`,
    config
  );
  res.send(data);
};
const permissionToRole = async (req, res) => {
  const config = {
    headers: { Authorization: req.headers.authorization },
  };
  let { id } = req.params;
  let { data } = await axios.post(
    `${process.env.apiEmployee}/api/role/permission/${id}`,
    req.body,
    config
  );
  res.send(data);
};
const removePermissionFromRole = async (req, res) => {
  let { id } = req.params;
  let { data } = await axios.delete(
    `${process.env.apiEmployee}/api/role/permission/${id}`,
    {
      data: req.body,
      headers: { Authorization: req.headers.authorization },
    }
  );
  res.send(data);
};

export {
  removePermissionFromRole,
  permissionToRole,
  listPermissionOfRole,
  listRole,
  addRole,
  updateRole,
  deleteRole,
  listPermissionAction,
};
