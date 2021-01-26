import axiosConfig from "./axios";

export const workflowProfile = () => {
    return axiosConfig
      .get(`/api/workflow/update-profile`)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return {
          error: "error",
        };
      });
  };