const express = require('express');

const userCtrl = require('../controllers/user');

const router = express.Router();

router.get('/:user_id', userCtrl.getUser);
router.get('/', userCtrl.getAllUsers);
router.put('/:user_id', userCtrl.modifyUser);
router.delete('/:user_id', userCtrl.deleteUser);

module.exports = router;
