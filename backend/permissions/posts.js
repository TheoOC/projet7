const jwt = require('jsonwebtoken');
const Post = require('../models/Post.model');
const User = require('../models/User.model');

const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
}

function hasPermission() {
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
                    return (user.isAdmin == true || post.UserId == user.id)
                })
                .catch((error) => {
                    throw error
                });

        })
        .catch((error) => { throw error });
}

module.exports = {
    hasPermission
}