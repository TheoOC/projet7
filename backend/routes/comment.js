const express = require('express');

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.post('/', commentCtrl.createComment);
//get error Route.put() requires a callback function but got a [object Undefined] 
//router.put('/:post_id',  commentCtrl.udpateComment);
router.get('/', commentCtrl.getAllCommentsOfPost);
router.delete('/:comment_id', commentCtrl.deleteComment);

module.exports = router;