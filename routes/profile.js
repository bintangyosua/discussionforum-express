const { isAuthenticated } = require('../middlewares/authSession');
const { getProfile } = require('../controllers/profileControllers');
const expires = require('express');
const router = expires.Router();


router.get('/profile', isAuthenticated, getProfile);

module.exports = router;