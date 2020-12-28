import api from '../gateways/auth';
import axios from 'axios';

const AUTH_REQUEST = ({ commit }, user) => {
    return new Promise((resolve, reject) => {
        //commit AUTH_REQUEST mutation
        commit("AUTH_REQUEST");
        //call api
        api.login(user)
            .then((res) => {
                console.log(`in AUTH_REQUEST: ${JSON.stringify(res)}`);
                const token = res.token;
                localStorage.setItem('user-token', token);

                const uid = res.userId;
                localStorage.setItem('user-id', uid);

                console.log("uid====> " + uid);

                //set authorization header to token
                axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
                console.log(`authorization header set: ${axios.defaults.headers.common['Authorization']}`);

                commit("AUTH_SUCCESS", token);
                resolve(`AUTH_REQUEST successfull`);
            }).catch((error) => {
                reject(`${error}`);
            })
        //after call to api call the mutation
    });
};
const AUTH_LOGOUT = ({ commit }) => {
    return new Promise((resolve) => {
        commit("AUTH_LOGOUT");
        localStorage.removeItem('user-token');

        localStorage.removeItem('user-id');

        //delete Authorization header
        delete axios.defaults.headers.common['Authorization'];
        console.log(`Authorization header deleted: ${axios.defaults.headers.common['Authorization']}`);
        resolve();
    })
};

export default {
    AUTH_REQUEST,
    AUTH_LOGOUT
};