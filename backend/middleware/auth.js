const jwt = require('jsonwebtoken');

const { validateLogInput, validateSignInput } = require('../permissions/auth');

const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
}

function validateLoginInput(req, res, next) {
    console.log(`in validateLoginInput`);
    const tReq = req;
    validateLogInput(tReq)
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

function validateSignupInput(req, res, next) {
    console.log(`in validateLoginInput`);
    const tReq = req;
    validateSignInput(tReq)
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
function auth(req, res, next) {

    console.log(`starting auth try block`);
    try {
        console.log(`getting token in header ${req.headers.authorization.split(' ')[1]}`);
        //get token in headers
        const token = req.headers.authorization.split(' ')[1];
        console.log(`decoding token with: ${process.env.SECRETKEY}`);
        //decode token
        const decodedToken = jwt.verify(token, process.env.SECRETKEY);

        console.log(`getting userid in token: ${decodedToken.userId}`);
        //get user id in token
        const userId = parseInt(decodedToken.userId);
        console.log(`auth: user id in req.body.userid: ${userId}`);
        console.log(`req.body.userId: ${req.body.userId} ----- userId:${userId}`);
        console.log(`${typeof req.body.userId} ${typeof userId}`);
        //for get requests req.body.userId is undefined 
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid userid';
        } else {
            console.log(`passed auth`);
            next();
        }
    } catch (error) {
        console.log(`auth failed error: ${error}`);
        res.status(401).json({
            error: new Error('invalid request!')
        });
    }
};
module.exports = {
    validateLoginInput,
    validateSignupInput,
    auth
}