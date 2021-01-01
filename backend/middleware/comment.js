const { validateInput, hasPermission } = require('../permissions/comment');


function validateCommentInput(req, res, next) {
    console.log(`in validatePostInput`);
    const tReq = req;
    validateInput(tReq)
        .then(() => {
            console.log("input validated!!");
            next();
        })
        .catch((error) => {
            console.log(`input invalid: ${error}`);
            res.status(422)
            return res.send('input not valid');
        });
};

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
    validateCommentInput,
    authDeleteComment,
    authUpdateComment
}