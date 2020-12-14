const { hasPermission } = require('../permissions/comment');

function authDeleteComment(req, res, next) {
    const tReq = req;
    hasPermission(tReq)
        .then(() => {
            console.log("hasPermission succeeded");
            next();
        })
        .catch((err) => {
            console.log(`has permission err: ${err}`);
            res.status(401)
            return res.send('not allowed');
        });
}

function authUpdateComment(req, res, next) {
    const tReq = req;
    hasPermission(tReq)
        .then(() => {
            console.log("hasPermission succeeded");
            next();
        })
        .catch((err) => {
            console.log(`has permission err: ${err}`);
            res.status(401)
            return res.send('not allowed');
        });
}

module.exports = {
    authDeleteComment,
    authUpdateComment
}