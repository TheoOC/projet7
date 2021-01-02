import aApi from '../gateways/auth';
import axios from 'axios';

const AUTH_AUTO = ({ commit }, token) => {
    return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST");
        aApi.autoAuthVerification()
            .then((user) => {
                console.log(`auto logged in: authorization header: ${axios.defaults.headers.common['Authorization']}`);

                //set user id
                const uid = JSON.stringify(user.id);
                localStorage.setItem('user-id', uid);
                console.log(`uid====> ${uid}`);

                //set is-admin flag
                const isAdminFlag = user.isAdmin;
                localStorage.setItem('is-admin', isAdminFlag);
                console.log(`is user Admin ?: ${isAdminFlag == 1}`);

                commit("AUTH_SUCCESS", token);
                resolve(`AUTH_REQUEST successfull`);
            })
            .catch((error) => {
                reject(`${error}`);
            });
    })
};

const AUTH_REQUEST = ({ commit }, user) => {
    return new Promise((resolve, reject) => {
        //commit AUTH_REQUEST mutation
        commit("AUTH_REQUEST");
        //call aApi
        aApi.login(user)
            .then((res) => {
                console.log(`in AUTH_REQUEST: ${JSON.stringify(res)}`);
                //set token
                const token = res.token;
                localStorage.setItem('user-token', token);

                //set user id
                const uid = res.userId;
                localStorage.setItem('user-id', uid);
                console.log(`uid====> ${uid}`);

                //set isAdmin flag
                const isAdminFlag = res.isAdmin;
                localStorage.setItem('is-admin', isAdminFlag);
                console.log(`is user Admin ?: ${isAdminFlag == 1}`);

                //set authorization header to token
                axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
                console.log(`authorization header set: ${axios.defaults.headers.common['Authorization']}`);

                commit("AUTH_SUCCESS", token);
                resolve(`AUTH_REQUEST successfull`);
            }).catch((error) => {
                reject(`${error}`);
            })
    });
};
const AUTH_LOGOUT = ({ commit }) => {
    return new Promise((resolve) => {
        commit("AUTH_LOGOUT");
        localStorage.removeItem('user-token');
        console.log(`user-token removed from local storage`);
        localStorage.removeItem('is-admin');
        console.log(`is-admin removed from local storage`);
        localStorage.removeItem('user-id');
        console.log(`user-id removed from local storage`);

        //delete Authorization header
        delete axios.defaults.headers.common['Authorization'];
        console.log(`Authorization header deleted: ${axios.defaults.headers.common['Authorization']}`);
        resolve();
    })
};

export default {
    AUTH_AUTO,
    AUTH_REQUEST,
    AUTH_LOGOUT
};