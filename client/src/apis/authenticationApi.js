import axios from "axios";
import docCookies from "doc-cookies";
import axiosConfig from "./axios";

export const login = (params) => {
  return axios
    .post("/api/login", params)
    .then((res) => {
      if (res.data.message === "Đăng nhập thành công!") {
        docCookies.setItem("usertoken", res.data.access_token, 2592000, "/");
        docCookies.setItem("user_id", res.data.detail.id, 2592000, "/");
        docCookies.setItem("email", res.data.detail.email, 2592000, "/");
      }
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return {
        error: "error",
      };
    });
};
export const getPermissionUser = (id) => {
  return axiosConfig
    .get(`/api/user/permission/${id}`)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return {
        error: "error",
      };
    });
};
export const slugPermission = () => {
  return axiosConfig
    .get(`/api/service-management/slug/list`)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return {
        error: "error",
      };
    });
};
export const getUser = (id) => {
  return axiosConfig
    .get(`/api/user/${id}`)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return {
        error: "error",
      };
    });
};
export const getUserApi = (id) => {
  return axiosConfig
    .get(`/api/user/${id}`)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return {
        error: "error",
      };
    });
};
export const updateUser = (id, params) => {
  return axiosConfig
    .put(`/api/user/${id}`, params)
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
export const register = (paramUser) => {
  return axiosConfig
    .post("/api/register", paramUser)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return {
        error: "error",
      };
    });
};
export const listUserCheck = (page, per_page) => {
  return axiosConfig
    .get(`/api/listUser`)
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
export const listUser = (page, per_page) => {
  return axiosConfig
    .get(`/api/userpagin?page=${page}&per_page=${per_page}`)
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
export const listAllUser = (page) => {
  return axiosConfig
    .get(`/api/userpagin?page=${page}`)
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
export const searchUser = (name, page, per_page) => {
  return axiosConfig
    .get(
      `/api/search/users?full_name=${name}&page=${page}&per_page=${per_page}`
    )
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
export const listUserDepartFilter = (id, page, per_page) => {
  return axiosConfig
    .get(`/api/userpagin/filter-dep/${id}?page=${page}&per_page=${per_page}`)
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
export const listUserDepartAndPos = (id, pos_id, page, per_page) => {
  return axiosConfig
    .get(
      `/api/userpagin/filter-dep-pos/${id}?pos_id=${pos_id}&page=${page}&per_page=${per_page}`
    )
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
export const listUserByPosition = (id, page, per_page) => {
  return axiosConfig
    .get(`/api/userpagin/filter-pos/${id}?page=${page}&per_page=${per_page}`)
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
export const checkApi = (params) => {
  return axiosConfig
    .post("/api/check-permission", params)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
      return {
        err: "error",
      };
    });
};
export const logout = async () => {
  await docCookies.removeItem("usertoken", "/");
  await docCookies.removeItem("user_id", "/");
  await docCookies.removeItem("email", "/");
};
