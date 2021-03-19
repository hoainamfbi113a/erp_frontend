import axiosConfig from "./axios";

export const workflowProfile = () => {
  let params = {
        "id": "20",
        "only": "active",
        "get_child": "1",
    };
    console.log(params)
    return axiosConfig
      .get(`/api/document-type/get`,{params})
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return {
          error: "error",
        };
      });
  };