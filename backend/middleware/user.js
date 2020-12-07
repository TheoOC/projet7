const { hasPermission } = require('../permissions/user');

function authDeleteUser(req, res, next) {
    if (!hasPermission) {
        res.status(401)
        return res.send('not allowed');
    }
    next();
}

function authUpdateUser(req, res, next) {
    if (!hasPermission) {
        res.status(401)
        return res.send('not allowed');
    }
    next();
}

module.exports = {
    authDeleteUser,
    authUpdateUser
}