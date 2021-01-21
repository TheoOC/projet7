const Joi = require('joi');
const jwt = require('jsonwebtoken');

const Post = require('../models/post');
const User = require('../models/user');

const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
}

function validateInput(req) {
    return new Promise((resolve, reject) => {
        console.log(`in validateInput`);
        //trim title and textContent of request
        const postObject = JSON.parse(req.body.post);
        postObject.title = postObject.title.trim();
        postObject.textContent = postObject.textContent.trim();
        //reassign the post to once trimmed
        req.body.post = JSON.stringify(postObject);

        const schema = Joi.object({
            title: Joi.string()
                .required()
                .min(4)
                .max(20)
                //allow whitespace only in the middle of the string and not at the beginning and end ( with ^\s witch mean no whitespace) 
                //allow any charater with . and allow a single white space character, 
                //including space, tab, form feed, line feed, and other Unicode spaces 
                .pattern(new RegExp(/^[^\s](.|\s)+[^\s]$/)),
            textContent: Joi.string()
                .required()
                .min(4)
                .max(100)
                .pattern(new RegExp(/^[^\s](.|\s)+[^\s]$/)),

        });
        //if input is invalid error will be assigne a ValidationError
        const { error, value } = schema.validate({ title: postObject.title, textContent: postObject.textContent });
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
        console.log('in post has permission !!!!!!!!!!');
        //check if user is admin or userId in token and in params match
        //find post in with post_id
        idQ = parseInt(req.params.post_id);
        Post.findOne({
            where: {
                id: idQ
            }
        })
            .then((post) => {
                //get userid in token
                console.log(`post found`);
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

                        console.log(`user found`);
                        console.log(`${user.isAdmin == true || post.UserId == user.id}`);
                        if (user.isAdmin == true || post.UserId == user.id) {
                            resolve();
                        }
                        reject('does not have post permissions');
                    })
                    .catch((error) => {
                        console.log(`${user.id} does not have permissions`);
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