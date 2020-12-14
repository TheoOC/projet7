const jwt = require('jsonwebtoken');

const sequelize = require('../database');
const { Post, User } = sequelize.models;

const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
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
    hasPermission
}