import axios from 'axios';
import router from '../router/index'
import store from '../store/index'

export default function setup() {
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        console.log(`THIS IS THE REQUEST INTERCEPTOR WHEN SUCCESSFULL`);
        return config;
    }, function (error) {
        // Do something with request error
        console.log(`THIS IS THE REQUEST INTERCEPTOR WHEN FAILED`);
        return Promise.reject(error);
    });

    axios.interceptors.response.use(
        function (response) {
            console.log(`THIS IS THE RESPONSE INTERCEPTOR WHEN SUCCESSFULL`);
            return response;
        }, function (err) {
            console.log(`THIS IS THE RESPONSE INTERCEPTOR WHEN FAILED`);
            if (err.response.status === 500) {
                console.log(`ERR 500 INTERCEPTED`);
                store.dispatch("AUTH_LOGOUT");
                router.push({
                    name: "Error",
                    params: { errorMessage: "500 server error", disconnect: true },
                })
                return Promise.reject(err);
            }
            if (err.response.status === 400) {
                console.log(`ERR 400 INTERCEPTED`);
                store.dispatch("AUTH_LOGOUT");
                router.push({
                    name: "Error",
                    params: { errorMessage: "400 bad request error", disconnect: true },
                })
                return Promise.reject(err);
            }
            if (err.response.status === 401) {
                console.log(`ERR 401 INTERCEPTED`);
                store.dispatch("AUTH_LOGOUT");
                router.push({
                    name: "Error",
                    params: { errorMessage: "401 Unauthorized", disconnect: true },
                })
                return Promise.reject(err);
            }
            if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                console.log(`CONFIG ERROR INTERCEPTED`);
                // if you ever get an unauthorized, logout the user
                store.dispatch("AUTH_LOGOUT");
                // you can also redirect to /login if needed !
                router.push({
                    name: "Error",
                    params: { errorMessage: "config error", disconnect: true },
                });
                return Promise.reject(err);
            }
        })
}