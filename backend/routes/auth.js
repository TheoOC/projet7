const express = require('express');

const authCtrl = require('../controllers/auth');
const { auth, validateLoginInput, validateSignupInput } = require('../middleware/auth');
const router = express.Router();

router.get('/autoAuth', auth, authCtrl.autoAuthVerification);
router.post('/login', validateLoginInput, authCtrl.login);
router.post('/signup', validateSignupInput, authCtrl.signup);

module.exports = router;
