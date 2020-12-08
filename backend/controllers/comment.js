const sequelize = require('../database');

const Comment = require('../models/Comment.model')(sequelize);


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

