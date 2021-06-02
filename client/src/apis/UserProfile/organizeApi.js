import axiosConfig from "../axios";

const getOrganizeApi = (payload) => {
  let { id_user, type } = payload;
  return axiosConfig
    .get(`/api/user-profile/organize/${id_user}?type=${type}`)
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

const addOrganizeApi = (params) => {
  return axiosConfig
    .post(`/api/user-profile/organize/add`, params)
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

const removeOrganizeApi = (params) => {
  return axiosConfig
    .post(`/api/user-profile/organize/delete`, params)
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

const updateOrganizeApi = (params) => {
  return axiosConfig
    .put(`/api/user-profile/organize/update`, params)
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

export { getOrganizeApi, addOrganizeApi, removeOrganizeApi, updateOrganizeApi };
