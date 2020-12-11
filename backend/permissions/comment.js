const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const Comment = require('../models/Comment.model');

function hasPermission() {
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
                    return (user.isAdmin == true || comment.UserId == user.id)
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