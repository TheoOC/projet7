const { hasPermission } = require('../permissions/posts');

function authDeletePost(req, res, next) {
    if (!hasPermission) {
        res.status(401)
        return res.send('not allowed');
    }
    next();
}

function authUpdatePost(req, res, next) {
    if (!hasPermission) {
        res.status(401)
        return res.send('not allowed');
    }
    next();
}

module.exports = {
    authDeletePost,
    authUpdatePost
}