const express = require('express');

const postCtrl = require('../controllers/post');

const auth = require('../middleware/auth');
const { authDeletePost, authUpdatePost } = require('../middleware/post');

const router = express.Router();

router.get('/:post_id', postCtrl.getPost);
router.get('/', postCtrl.getAllPosts);
router.get('/:post_id/comment', postCtrl.getAllCommentsOfPost);

router.post('/', auth, postCtrl.createPost);

router.put('/:post_id', auth, authUpdatePost, postCtrl.updatePost);
router.delete('/:post_id', auth, authDeletePost, postCtrl.deletePost);

module.exports = router;