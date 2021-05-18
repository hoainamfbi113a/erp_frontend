import axiosConfig from "../axios";

export const getRewardFamily = (id) => {
  return axiosConfig
    .get(`/api/user-profile/reward-discipline/users/3`)
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

export const addRewardFamily = (params) => {
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
