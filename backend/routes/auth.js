const express = require('express');

const authCtrl = require('../controllers/auth');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/autoAuth', auth, authCtrl.autoAuthVerification);
router.post('/login', authCtrl.login);
router.post('/signup', authCtrl.signup);

module.exports = router;
