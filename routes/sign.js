const express = require('express');
const signControllers = require('../controllers/signControllers');
const router = express.Router();


// Route untuk verifikasi SignUp
router.post('/signup', signControllers.signUp);

// Route untuk verifikasi SignIn
router.post('/signin', signControllers.signIn);

// Route untuk logOut
router.post('/logout', signControllers.logOut);


module.exports = router;