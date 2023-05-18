const express = require("express");
const router = express.Router();
const {
  addReply,
  getAllReplies,
  deleteReply,
} = require("../controllers/replyControllers");
const { isAuthenticated } = require("../middlewares/authSession");

// Route untuk menambah reply baru
router.post("/replies/add-reply", addReply);

// Router untuk mendapatkan semua data reply
router.post("/replies", getAllReplies);

// Router untuk menghapus reply berdasarkan id
router.delete("/replies/:id", deleteReply);

module.exports = router;
