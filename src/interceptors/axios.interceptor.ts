import Axios from  'axios-observable';
import store from 'store/store'
import { logout } from 'store/auth/auth.actions';

Axios.interceptors.request.use(request => {
    const authKey = store.getState().authStore.token;
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
                        store.dispatch(logout())
                        window.location.pathname = '/login';
                    }
                break;
            }
        }
        throw error.response;
    }
)