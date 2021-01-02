const jwt = require('jsonwebtoken');
const sequelize = require('../database')
const { User } = sequelize.models;

const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
}

module.exports = (req, res, next) => {
    try {
        console.log(`in is Admin`);
        //decode the token and get token userId
        const token = req.headers.authorization.split(' ')[1];
        console.log(`token: ${token}`);
        const decodedToken = jwt.verify(token, process.env.SECRETKEY);
        console.log(`token decoded: ${decodedToken}`);
        const userId = parseInt(decodedToken.userId);
        console.log(`userId: ${userId}`);
        //find user with same userId
        User.findOne({
            where: {
                id: userId
            }
        })
            .then((user) => {
                console.log(`user found`);
                //if user is not admin throw error else continue
                if (user.isAdmin != true) {
                    console.log(`user is not an admin`);
                    throw 'user is not an administrator'
                }
                else {
                    console.log(`user is an admin`);
                    next();
                }
            })
            .catch((error) => {
                console.log(`failed to find the user: ${error}`);
                res.status(400).json({ error })
            });

    }
    catch (error) {
        console.log(`isAdmin failed error: ${error}`);
        res.status(401).json({
            error: new Error('invalid request!')
        });
    }
}