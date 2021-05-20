import axiosConfig from "../axios";

const getUserFamilyApi = (id) => {
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

const addUserFamilyApi = (params) => {
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

const removeUserFamilyApi = (id) => {
  return axiosConfig
    .post(`/api/user-profile/family/delete/${id}`)
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

export { getUserFamilyApi, addUserFamilyApi, removeUserFamilyApi };
