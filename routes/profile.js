const express = require("express");
const { isAuthenticated } = require("../middlewares/authSession");
const { getProfile } = require("../controllers/profileControllers");
const router = express.Router();

router.get("/profile", isAuthenticated, getProfile);

module.exports = router;
