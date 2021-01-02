const express = require('express');

const commentCtrl = require('../controllers/comment');
const { auth } = require('../middleware/auth');
const { validateCommentInput, authDeleteComment, authUpdateComment } = require('../middleware/comment');

const router = express.Router();

router.get('/:comment_id', auth, commentCtrl.getComment);
router.get('/post/:post_id', auth, commentCtrl.getAllCommentsOfPost);
router.get('/:user_id', auth, commentCtrl.getAllCommentsOfUser);

router.post('/', auth, validateCommentInput, commentCtrl.createComment);
router.put('/:comment_id', auth, authUpdateComment, validateCommentInput, commentCtrl.updateComment);
router.delete('/:comment_id', auth, authDeleteComment, commentCtrl.deleteComment);

module.exports = router;