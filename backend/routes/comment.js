const express = require('express');

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.post('/', commentCtrl.createComment);
router.put('/:comment_id', commentCtrl.updateComment);
router.delete('/:comment_id', commentCtrl.deleteComment);

module.exports = router;