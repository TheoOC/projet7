const sequelize = require('../database');

const Post = require('../models/Post.model')(sequelize);

exports.createPost = (req, res, next) => {
    //create post
    const post = Post.create({
        title: req.body.title,
        textContent: req.body.textContent,
        UserId: req.body.userId
    }).then(() => {
        res.status(200).json({ message: "post created" });
        console.log('post success');
    })
        .catch((error) => {
            console.log('post failed');
            res.status(400).json({ error });
        });
};

exports.getAllPosts = (req, res, next) => {
    Post.findAll()
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((error) => { res.status(400).json({ error }) });
}
exports.modifyPost = (req, res, next) => {

}
exports.getPost = (req, res, next) => {

}
exports.deletePost = (req, res, next) => {

}