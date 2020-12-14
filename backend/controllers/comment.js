const sequelize = require('../database');

const Comment = require('../models/Comment.model')(sequelize);

exports.getComment = (req, res, next) => {
    console.log(`get comment: id ===========> ${req.params.comment_id}`);
    const idQ = parseInt(req.params.comment_id);
    Comment.findOne({
        where: {
            id: idQ
        }
    })
        .then((comment) => {
            res.status(200).json(comment);
        })
        .catch((err) => {
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
            console.log(`post to update found`)
            //change post fields
            comment.textContent = req.body.textContent;
            //user model.save to update the instance
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
        .then(() => { res.status(200).json({ message: 'comment deleted' }) })
        .catch(error => { res.status(400).json({ error }) });
}

