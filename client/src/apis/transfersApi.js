import axiosConfig from "./axios";

export const transfersProfile = (pro_id) => {
    return axiosConfig
      .get(`/api/transfers/profiles/${pro_id}`)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return {
          error: "error",
        };
      });
  };