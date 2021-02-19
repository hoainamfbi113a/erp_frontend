let callAPI = async ({ url, method, data }) => {
    return await Axios({
      url,
      method,
      data
    });
  };

export {
    callAPI
}