const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
}

module.exports = (req, res, next) => {
    try {
        //decode the token and get token userId
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRETKEY);
        const userId = parseInt(decodedToken.userId);
        //find user with same userId
        User.findOne({
            where: {
                id: userId
            }
        })
            .then((user) => {
                //if user is not admin throw error else continue
                const isAdmin = user.isAdmin;
                if (isAdmin != true) {
                    throw 'user is not an administrator'
                }
                else {
                    next();
                }
            })
            .catch((error) => { res.status(400).json({ error }) });

    }
    catch {
        res.status(401).json({
            error: new Error('invalid request!')
        });
    }
}