const express = require('express');

const commentCtrl = require('../controllers/comment');

const router = express.Router({ mergeParams: true });

router.post('/', commentCtrl.createComment);
router.put('/:post_id', commentCtrl.modifyComment);
router.get('/:post_id', commentCtrl.getComment);
router.get('/', commentCtrl.getAllComments);
router.delete('/:post_id', commentCtrl.deleteComment);

module.exports = router;