const express = require('express');

const authCtrl = require('../controllers/auth');
const { auth, validateLoginInput, validateSigninInput } = require('../middleware/auth');
const router = express.Router();

router.get('/autoAuth', auth, authCtrl.autoAuthVerification);
router.post('/login', validateLoginInput, authCtrl.login);
router.post('/signup', validateSigninInput, authCtrl.signup);

module.exports = router;
