const sequelize = require('../database');

const Post = require('../models/Post.model')(sequelize);

exports.createPost = (req, res, next) => {
    //create post
    console.log(req.body);
    const Post = Post.Create({

    })
//link it to an user

}
exports.modifyPost = (req, res, next) => {

}
exports.getPost = (req, res, next) => {

}
exports.getAllPosts = (req, res, next) => {

}
exports.deletePost = (req, res, next) => {

}