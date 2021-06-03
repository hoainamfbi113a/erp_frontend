import axiosConfig from "../axios";

export const getJoinDCSApi = (payload) => {
  let { id_user, type } = payload;

  return axiosConfig
    .get(`/api/user-profile/party/users/${id_user}?type=${type}`)
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

export const addJoinDCSApi = (params) => {
  // console.log(params)
  return axiosConfig
    .post(`/api/user-profile/party`, params)
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
//api/party/1
export const removeJoinDCSApi = (params) => {
  return axiosConfig
    .post(`/api/user-profile/partyd`, params)
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

export const updateJoinDCSApi = (params) =>{
  return axiosConfig
    .put(`/api/user-profile/partyd/users`, params)
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