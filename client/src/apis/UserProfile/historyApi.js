import axiosConfig from "../axios";

const getUserHistoryApi = (params) => {
  return axiosConfig
    .get(`/api/user-profile/history/${params.id}`)
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

const addUserHistoryApi = (params) => {
  return axiosConfig
    .post(`/api/user-profile/history/add`, params)
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

const removeUserHistoryApi = (id) => {
  return axiosConfig
    .post(`/api/user-profile/history/delete/${id}`)
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

const updateUserHistoryApi = (params) => {
  return axiosConfig
    .put(`/api/user-profile/history/update`, params)
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

export { getUserHistoryApi, addUserHistoryApi, removeUserHistoryApi, updateUserHistoryApi };
