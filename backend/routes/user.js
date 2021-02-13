const express = require('express');

const userCtrl = require('../controllers/user');

const { auth } = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const { validateUserInput, authDeleteUser, authUpdateUser } = require('../middleware/user');

const router = express.Router();

router.get('/:user_id', auth, userCtrl.getUser);
router.get('/', auth, isAdmin, userCtrl.getAllUsers);

router.put('/:user_id', auth, authUpdateUser, validateUserInput, userCtrl.updateUser);
router.delete('/:user_id', auth, authDeleteUser, userCtrl.deleteUser);

//request a friend
router.post('/friends/add/:user_id', auth, userCtrl.addFriend);
//accept friend request
router.put('/friends/accept/:user_id', auth, userCtrl.acceptFriend);
//decline friend request
router.put('/friends/decline/:user_id', auth, userCtrl.declineFriend);
//delete a friend (unfriend)
router.delete('/friends/delete/:user_id', auth, userCtrl.deleteFriend);
//get all friends (get friends list)
router.get('/friends/:user_id', auth, userCtrl.getFriends);
//get all friend requests received
router.get('/friends/RequestReceived/:user_id', auth, userCtrl.getFriendRequestReceived);
//get all friend request sent
router.get('/friends/RequestSent/:user_id', auth, userCtrl.getFriendRequestSent);

module.exports = router;
