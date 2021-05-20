let callAPI = async ({ url, method, data }) => {
    return await Axios({
      url,
      method,
      data
    });
  };
const config = (req) => {
  return {
    headers: { Authorization: req.headers.authorization }
  }
}
export {
    callAPI,
    config
}