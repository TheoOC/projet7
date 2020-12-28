const fs = require('fs');

const sequelize = require('../database');
const Post = require('../models/Post.model')(sequelize);

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

exports.createPost = (req, res, next) => {
    //create post
    const postObject = JSON.parse(req.body.post);
    let tImageUrl;
    if (req.file) {
        tImageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    else {
        tImageUrl = null
    }
    const post = Post.create({
        title: postObject.title,
        textContent: postObject.textContent,
        UserId: postObject.userId,
        imageUrl: tImageUrl,
    })
        .then(() => {
            res.status(200).json({ message: "post created" });
        })
        .catch((error) => {
            console.log(`failed to create post: ${error}`);
            res.status(400).json({ error });
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
            console.log(`post to update found: `);
            let postObject = JSON.parse(req.body.post);
            if (req.file) {
                //if there is a new image change imageUrl
                postObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }
            for (index in postObject) {
                console.log(`${index}`);
            }
            //if there is already an image delete the previous one with fs.unlink
            //else just update the post
            if (req.file) {
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, (err) => {
                    if (err) {
                        console.log(`there was an error in fs.unlink: ${err}`);
                        throw err
                    };
                    console.log(`image deleted from backend`);
                })
            }

            //change post fields
            post.title = postObject.title;
            post.textContent = postObject.textContent;
            post.imageUrl = postObject.imageUrl;
            //use model.save to update the instance
            post.save().then(() => {
                res.status(200).json({ message: "post updated" });
            }).catch((error) => {
                console.log(`failed to save post ${error}`);
                res.status(400).json({ error });
            });
        })
        .catch((error) => {
            console.log(`failed to find post: ${error}`);
            res.status(500).json({ error })
        });
};

exports.deletePost = (req, res, next) => {
    const postQ = parseInt(req.params.post_id);
    Post.findOne({
        where: {
            id: postQ
        }
    })
        .then((post) => {
            if (post.imageUrl != null) {
                console.log(`in if statement to delete the image`);
                //get name of image
                const filename = post.imageUrl.split('/images/')[1];
                console.log(`image name : ${filename}`);
                //remove file from images folder
                fs.unlink(`images/${filename}`, (err) => {
                    if (err) {
                        console.log(`there was an error in fs.unlink: ${err}`);
                        throw err
                    };
                    console.log(`image deleted from backend`);
                });
            }
            Post.destroy({
                where: {
                    id: postQ
                }
            })
                .then(() => {
                    res.status(200).json({ message: 'post deleted' })
                })
                .catch((error) => {
                    console.log(`failed to delete post: ${error} `);
                    res.status(400).json({ error })
                });
        })
        .catch((err) => {
            console.log(`errrrrrrrrrroooooooooor: ${err}`);
            res.status(500).json({ error })
        });

};