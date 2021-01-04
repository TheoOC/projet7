const express = require('express');

const postCtrl = require('../controllers/post');

const { auth } = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const { validatePostInput, authDeletePost, authUpdatePost } = require('../middleware/post');

const router = express.Router();

router.get('/:post_id', auth, postCtrl.getPost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/user/:user_id', auth, postCtrl.getAllPostsOfUser);

router.post('/', auth, multer, validatePostInput, postCtrl.createPost);
router.put('/:post_id', auth, multer, authUpdatePost, validatePostInput, postCtrl.updatePost);
router.delete('/:post_id', auth, authDeletePost, postCtrl.deletePost);

module.exports = router;