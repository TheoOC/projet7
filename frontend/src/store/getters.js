//check if token is true
const isAuthenticated = state => !!state.user.token;
const isAdmin = state => state.user.isAdmin === "true";
const authStatus = state => state.auth.status;
const getUserId = state => parseInt(state.user.userId);

export default {
    isAuthenticated,
    isAdmin,
    authStatus,
    getUserId
};