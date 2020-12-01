const express = require('express');

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.post('/', auth, commentCtrl.createComment);
router.put('/:post_id', auth, commentCtrl.modifyComment);
router.get('/:post_id', commentCtrl.getComment);
router.get('/', commentCtrl.getAllComments);
router.delete('/:post_id', auth, commentCtrl.deleteComment);

module.exports = router;