import axiosConfig from "../axios";

const getUserAbroadApi = (params) => {
  return axiosConfig
    .get(`/api/user-profile/abroad/${params.id}`)
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

const addUserAbroadApi = (params) => {
  return axiosConfig
    .post(`/api/user-profile/abroad/add`, params)
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

const removeUserAbroadApi = (id) => {
  return axiosConfig
    .post(`/api/user-profile/abroad/delete/${id}`)
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

const updateUserAbroadApi = (params) => {
  return axiosConfig
    .put(`/api/user-profile/abroad/update`, params)
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

export { getUserAbroadApi, addUserAbroadApi, removeUserAbroadApi, updateUserAbroadApi };
