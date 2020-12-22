import axios from 'axios';

const api = async (url, method, body) => {
  /**
   * config object for fetch
   */
  const config = {
    method: 'get',
    baseURL: 'https://employee.tuoitre.vn/api/',
    url,
    headers: {
      'Content-type': 'application/json',
      authorization: localStorage.getItem('usertoken'),
    },
  };

  if (method) {
    config.method = method;
  }
  if (body) {
    config.data = body;
  }

  let response;
  try {
    response = await axios(config);
    return {...response.data};
  } catch (e) {
    throw new Error(e.message);
  }
};

export default api;