import Vue from 'vue'

const AUTH_REQUEST = (state) => {
    state.auth.status = 'loading'
};
const AUTH_SUCCESS = (state, token) => {
    state.auth.status = 'success';
    Vue.set(state.user, 'token', token);
    Vue.set(state.user, 'userId', localStorage.getItem('user-id'));
    Vue.set(state.user, 'isAdmin', localStorage.getItem('is-admin'));
};
const AUTH_ERROR = (state) => {
    state.auth.status = 'error'
};
const AUTH_LOGOUT = (state) => {
    state.user.token = null;
    state.user.userId = null;
    state.user.isAdmin = null;
    state.auth.status = 'logged out';
};

export default {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_ERROR,
    AUTH_LOGOUT
};