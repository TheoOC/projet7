const { validateInput, hasPermission } = require('../permissions/user');


function validateUserInput(req, res, next) {
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
            return res.send(error);
        });
};

function authDeleteUser(req, res, next) {
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

function authUpdateUser(req, res, next) {
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
    validateUserInput,
    authDeleteUser,
    authUpdateUser
}