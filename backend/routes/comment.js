const express = require('express');

const commentCtrl = require('../controllers/comment');
const { auth } = require('../middleware/auth');
const { validateCommentInput, authDeleteComment, authUpdateComment } = require('../middleware/comment');

const router = express.Router();

router.post('/', auth, validateCommentInput, commentCtrl.createComment);
router.get('/:comment_id', auth, commentCtrl.getComment);
router.get('/post/:post_id', auth, commentCtrl.getAllCommentsOfPost);
router.get('/post/:user_id', auth, commentCtrl.getAllCommentsOfUser);
router.put('/:comment_id', auth, validateCommentInput, authUpdateComment, commentCtrl.updateComment);
router.delete('/:comment_id', auth, authDeleteComment, commentCtrl.deleteComment);

module.exports = router;