const { hasPermission } = require('../permissions/comment');

function authDeleteComment(req, res, next) {
    if (!hasPermission) {
        res.status(401)
        return res.send('not allowed');
    }
    next();
}

function authUpdateComment(req, res, next) {
    if (!hasPermission) {
        res.status(401)
        return res.send('not allowed');
    }
    next();
}

module.exports = {
    authDeleteComment,
    authUpdateComment
}