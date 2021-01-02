const Joi = require('joi');
const jwt = require('jsonwebtoken');

const sequelize = require('../database');
const { User } = sequelize.models;

const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
}


function validateInput(req) {
    return new Promise((resolve, reject) => {
        console.log(`
        in validateInput
        body: ${JSON.stringify(req.body)}

        `);
        //trim username
        req.body.username = req.body.username.trim();

        const schema = Joi.object({
            username: Joi.string()
                .required()
                .min(3)
                .max(30)
                .pattern(new RegExp(/^[^\s].+[^\s]$/)),

        });
        //if input is invalid error will be assigne a ValidationError
        const { error, value } = schema.validate({ username: req.body.username });
        //check if error is a validation error
        if (Joi.isError(error)) {
            //if validation error delete image and return error code 422 for input error
            reject(error);
        }
        //else continue
        resolve();
    })
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
                if (user.id == userQ || user.isAdmin == true) {
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
    validateInput,
    hasPermission
}