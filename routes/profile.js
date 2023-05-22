const express = require("express");
const { isAuthenticated } = require("../middlewares/authSession");
const {
  getProfile,
  getQuestionsByUser,
  getThreadsByUser,
} = require("../controllers/profileControllers");
const router = express.Router();

router.get("/profile/:id_user", isAuthenticated, getProfile);

router.get("/profile/:id_user/questions", getQuestionsByUser);

router.get("/profile/:id_user/threads", getThreadsByUser);

module.exports = router;
