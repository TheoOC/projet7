const { Comment } = require('../models');

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
        .catch(error => {
            console.log(`failed get all comments of post: ${error}`);
            res.status(400).json({ error })
        });
};
exports.getAllCommentsOfUser = (req, res, next) => {
    const userQ = parseInt(req.params.user_id);
    Comment.findAll({
        where: {
            UserId: userQ
        }
    })
        .then((comments) => {
            res.status(200).json(comments);
        })
        .catch(error => res.status(400).json({ error }));
    //
};
exports.getComment = (req, res, next) => {
    console.log(`get comment: id ===========> ${req.params.comment_id}`);
    const idQ = parseInt(req.params.comment_id);
    Comment.findOne({
        where: {
            id: idQ
        }
    })
        .then((comment) => {
            if (!comment) {
                console.log(`couldn't get comment`);
                res.status(500).json({ error })
            }
            res.status(200).json(comment);
        })
        .catch((err) => {
            console.log(`error getting comment`);
            res.status(400).json({ err });
        });
}
exports.createComment = (req, res, next) => {
    const comment = Comment.create({
        textContent: req.body.textContent,
        UserId: req.body.userId,
        PostId: req.body.postId
    }).then(() => {
        res.status(200).json({ message: "comment created" });
    })
        .catch(error => { res.status(400).json({ error }) });

}
exports.updateComment = (req, res, next) => {
    console.log(`in update comment`);
    const idQ = req.params.comment_id
    Comment.findOne({
        where: {
            id: idQ
        }
    })
        .then((comment) => {
            if (!comment) {
                console.log(`couldn't find comment to update`);
                res.status(500).json({ error })
            }
            console.log(`post to update found`)
            //change comment fields
            comment.textContent = req.body.textContent;
            //use model.save to update the instance
            comment.save().then(() => {
                res.status(200).json({ message: "comment updated" });
            }).catch((error) => {
                res.status(400).json({ error });
            });
        })
        .catch((error) => { res.status(500).json({ error }) });
}
exports.deleteComment = (req, res, next) => {
    const commentQ = parseInt(req.params.comment_id);
    Comment.destroy({
        where: {
            id: commentQ
        }
    })
        .then(() => {
            console.log(`comment destroyed`);
            res.status(200).json({ message: 'comment deleted' });
        })
        .catch(error => { res.status(400).json({ error }) });
}

