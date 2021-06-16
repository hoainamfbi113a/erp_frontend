import axiosConfig from "../axios";

const getTrainingApi = (payload) => {
  let { id_user, type } = payload;
  return axiosConfig
    .get(`/api/user-profile/training/${id_user}?type=${type}`)
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

const addTrainingApi = (params) => {
  return axiosConfig
    .post(`/api/user-profile/training/add`, params)
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

const removeTrainingApi = (params) => {
  return axiosConfig
    .post(`/api/user-profile/training/delete`, params)
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

const updateTrainingApi = (params) => {
  return axiosConfig
    .put(`/api/user-profile/training/update`, params)
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

export { getTrainingApi, addTrainingApi, removeTrainingApi, updateTrainingApi };
