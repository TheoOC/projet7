const { hasPermission } = require('../permissions/posts');

function authDeletePost(req, res, next) {
    //save current req and send it to has Permission
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

function authUpdatePost(req, res, next) {
    console.log('in authUpdatePost');

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
};


module.exports = {
    authDeletePost,
    authUpdatePost
}