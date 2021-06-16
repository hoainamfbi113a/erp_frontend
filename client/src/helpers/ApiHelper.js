import axios from 'axios';

export function getHeader(key){
    const headers = {
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + key,
        'X-Requested-With' : 'XMLHttpRequest',
    }
    return headers
}

export function callAxios(url, method, params, data, apiKey) {
    return axios(
        {
            url: url,
            method:method,
            params: params,
            headers: getHeader(apiKey),
            data: data
        }
    )
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err)
        })
}
