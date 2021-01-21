const Joi = require('joi');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Comment = require('../models/comment');

function validateInput(req) {
    return new Promise((resolve, reject) => {
        console.log(`in comment validateInput: ${req.body.textContent}`);
        //remove end and beginning whitespaces
        req.body.textContent = req.body.textContent.trim();
        const schema = Joi.object({
            //allow whitespace only in the middle of the string and not at the beginning and end ( with ^\s witch mean no whitespace) 
            //allow any charater with . and allow a single white space character, 
            //including space, tab, form feed, line feed, and other Unicode spaces 
            textContent: Joi.string().required().min(2).max(50).pattern(new RegExp(/^[^\s](.|\s)+[^\s]$/)),
        });
        //if input is invalid error will be assigne a ValidationError
        const { error, value } = schema.validate({ textContent: req.body.textContent });
        //check if error is a validation error
        if (Joi.isError(error)) {
            reject(error);
        }
        //else continue
        resolve();
    })
}
function hasPermission(req) {
    return new Promise((resolve, reject) => {
        //check if user is admin or UserId in headers is the same as the comment.Userid
        //find user
        idQ = parseInt(req.params.comment_id);
        Comment.findOne({
            where: {
                id: idQ
            }
        })
            .then((comment) => {
                //get userid in token

                const token = req.headers.authorization.split(' ')[1];
                const decodedToken = jwt.verify(token, process.env.SECRETKEY);
                const userId = decodedToken.userId;

                //find user in token
                User.findOne({
                    where: {
                        id: userId
                    }
                })
                    .then((user) => {
                        //check if user in token is admin or if it is the owner of the token
                        if (user.isAdmin == true || comment.UserId == user.id) {
                            resolve();
                        }
                        reject('does not have comment permissions');
                    })
                    .catch((error) => {
                        throw error
                    });

            })
            .catch((error) => { throw error });
    })
}

module.exports = {
    validateInput,
    hasPermission
}