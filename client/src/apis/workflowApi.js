import axiosConfig from "./axios";

export const workflowProfile = (value) => {
  // let params = {
  //       "id": "20",
  //       "only": "active",
  //       "get_child": "1",
  //   };
    // console.log(params)
    return axiosConfig
      .get(`/api/workflow/detail?type_id=${value}`)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return {
          error: "error",
        };
      });
  };