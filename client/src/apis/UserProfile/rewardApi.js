import axiosConfig from "../axios";

export const getRewardApi = (payload) => {
  let { id_user, type } = payload;

  return axiosConfig
    .get(`/api/user-profile/reward-discipline/users/${id_user}?type=${type}`)
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

export const addRewardApi = (params) => {
  // console.log(params)
  return axiosConfig
    .post(`/api/user-profile/reward-discipline`, params)
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
//api/reward-discipline/1
export const removeRewardApi = (params) => {
  return axiosConfig
    .post(`/api/user-profile/reward-disciplined`, params)
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

export const updateRewardApi = (params) =>{
  return axiosConfig
    .put(`/api/user-profile/reward-disciplined/users`, params)
    .then((data =>{
      return data
    }))
    .catch(err=>{
      console.log(err);
      return {
        err: "error"
      }
    })
}