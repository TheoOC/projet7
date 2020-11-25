const express = require('express');

const postCtrl = require('../controllers/post');

const router = express.Router();

router.post('/', postCtrl.createPost);
router.put('/:post_id', postCtrl.modifyPost);
router.get('/:post_id', postCtrl.getPost);
router.get('/', postCtrl.getAllPosts);
router.delete('/:post_id', postCtrl.deletePost);

module.exports = router;