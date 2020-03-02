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


Axios.interceptors.response.use(
    response => response,
    error => {
        if(error && error.response) {
            switch(error.response.status)
            {
                case 401:
                    if(!window.location.pathname.includes('login')){
                        localStorage.setItem("auth_key", "");
                        window.location.pathname = '/login';
                    }
                break;
            }
        }
        throw error.response;
    }
)