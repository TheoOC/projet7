const sequelize = require('../database');

const Post = require('../models/Post.model')(sequelize);
const Comment = require('../models/Comment.model')(sequelize);

exports.getAllCommentsOfPost = (req, res, next) => {
    const postQ = parseInt(req.params.post_id);
    Comment.findAll({
        where: {
            PostId: postQ
        }
    })
        .then((comments) => {
            console.log(`comments--------------------- ${JSON.stringify(comments)}`);
            res.status(200).json(comments);
        })
        .catch(error => res.status(400).json({ error }));
};

exports.createPost = (req, res, next) => {
    //create post
    const post = Post.create({
        title: req.body.title,
        textContent: req.body.textContent,
        UserId: req.body.userId
    })
        .then(() => {
            res.status(200).json({ message: "post created" });
        })
        .catch((error) => {
            console.log(`failed to create post: ${error}`);
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
};

exports.updatePost = (req, res, next) => {
    //find the post
    console.log(`in update post`);
    const idQ = req.params.post_id
    Post.findOne({
        where: {
            id: idQ
        }
    })
        .then((post) => {
            console.log(`post to update found`)
            //change post fields
            post.title = req.body.title;
            post.textContent = req.body.textContent;
            //use model.save to update the instance
            post.save().then(() => {
                res.status(200).json({ message: "post updated" });
            }).catch((error) => {
                res.status(400).json({ error });
            });
        })
        .catch((error) => { res.status(500).json({ error }) });
};

exports.deletePost = (req, res, next) => {
    const postQ = parseInt(req.params.post_id);
    Post.destroy({
        where: {
            id: postQ
        }
    })
        .then(() => { res.status(200).json({ message: 'post deleted' }) })
        .catch((error) => {
            console.log(`failed to delete post: ${error} `);
            res.status(400).json({ error })
        });
};