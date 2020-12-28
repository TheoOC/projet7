const { validateInput, hasPermission } = require('../permissions/posts');

function validatePostInput(req, res, next) {
    console.log(`in validatePostInput`);
    const tReq = req;
    validateInput(tReq)
        .then(() => {
            console.log("input validated!!");
            next();
        }).catch(() => {
            res.status(422)
            return res.send('input not valid');
        });
}

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
    validatePostInput,
    authDeletePost,
    authUpdatePost
}