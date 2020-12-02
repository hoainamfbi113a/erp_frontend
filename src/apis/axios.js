import axios from 'axios';
// add header token 
/* request pre-processing */
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export const axiosUser = axios.create({
    baseURL: process.env.apiUser
})