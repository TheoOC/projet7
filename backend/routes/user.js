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

module.exports = router;
