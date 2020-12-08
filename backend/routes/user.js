const express = require('express');

const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');
const { authDeleteUser, authUpdateUser } = require('../middleware/user');

const router = express.Router();

router.get('/:user_id', auth, userCtrl.getUser);
router.get('/', auth, userCtrl.getAllUsers);

router.get('/:user_id/comment', auth, userCtrl.getAllCommentsOfUser);

router.put('/:user_id', auth, authUpdateUser, userCtrl.updateUser);
router.delete('/:user_id', auth, authDeleteUser, userCtrl.deleteUser);

module.exports = router;
