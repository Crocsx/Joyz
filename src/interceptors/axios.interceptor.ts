import Axios from  'axios-observable';

Axios.interceptors.request.use(request => {
    const authKey = localStorage.getItem("auth_key");
    if(authKey)
    {
        request.headers.common = {...request.headers.common, ...{
            Authorization: `Bearer ${authKey}`,
        }}
    }
    return request;
}, error => {
    return Promise.reject(error)
});