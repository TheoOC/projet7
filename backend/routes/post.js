const express = require('express');

const postCtrl = require('../controllers/post');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const { validatePostInput, authDeletePost, authUpdatePost } = require('../middleware/post');

const router = express.Router();

router.get('/:post_id', postCtrl.getPost);
router.get('/', postCtrl.getAllPosts);

router.post('/', auth, multer, postCtrl.createPost);

router.put('/:post_id', auth, multer, authUpdatePost, postCtrl.updatePost);
router.delete('/:post_id', auth, authDeletePost, postCtrl.deletePost);

module.exports = router;