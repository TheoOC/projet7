const sequelize = require('../database');
const { User } = sequelize.models;

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
}

function hasPermission(req) {
    return new Promise((resolve, reject) => {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRETKEY);
        const userId = parseInt(decodedToken.userId);

        User.findOne({
            where: {
                id: userId
            }
        })
            .then((user) => {
                //check if user is the same has the one in the params
                userQ = parseInt(req.params.user_id);
                if (user.id == userQ) {
                    resolve();
                }
                reject('does not have user permission');
            })
            .catch((error) => {
                throw error;
            });
    })
}

module.exports = {
    hasPermission
}