import axiosConfig from "../axios";

const getUserFamilyApi = (params) => {
  return axiosConfig
    .get(`/api/user-profile/family/${params.id}?type=${params.type}`)
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

const updateUserFamilyApi = (params) => {
  return axiosConfig
    .put(`/api/user-profile/family/update`, params)
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

export { getUserFamilyApi, addUserFamilyApi, removeUserFamilyApi, updateUserFamilyApi };
