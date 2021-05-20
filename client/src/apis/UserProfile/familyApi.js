import axiosConfig from "../axios";

const getUserFamily = (id) => {
  return axiosConfig
    .get(`/api/user-profile/family/${id}`)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return {
        err: "error",
      };
    });
};

const addUserFamily = (params) => {
  return axiosConfig
    .post(`/api/user-profile/family/add`, params)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return {
        err: "error",
      };
    });
};

const deleteUserFamily = (id) => {
  return axiosConfig
    .get(`/api/user-profile/family/delete/${id}`)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return {
        err: "error",
      };
    });
};

export { getUserFamily, addUserFamily, deleteUserFamily };
