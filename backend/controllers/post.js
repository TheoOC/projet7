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
    })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.getAllPosts = (req, res, next) => {
    Post.findAll()
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((error) => { res.status(400).json({ error }) });
};

exports.getPost = (req, res, next) => {
    console.log(`get post: id ===========> ${req.params.post_id}`);
    const idQ = parseInt(req.params.post_id);
    Post.findOne({
        where: {
            id: idQ
        }
    })
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
}

exports.updatePost = (req, res, next) => {

}
exports.deletePost = (req, res, next) => {
    const postQ = parseInt(req.params.post_id);
    Post.destroy({
        where: {
            id: postQ
        }
    })
        .then(() => { res.status(200).json({ message: 'user post deleted' }) })
        .catch((error) => { res.status(400).json({ error }) });
}