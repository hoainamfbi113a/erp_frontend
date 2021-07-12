import axiosConfig from "../axios";

const getAllCityApi = () => {
  return axiosConfig
    .get(`/api/user-profile/cities`)
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

const getDistrictById = (id) => {
  return axiosConfig
    .get(`/api/user-profile/districts/${id}`)
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

export { getAllCityApi, getDistrictById };
