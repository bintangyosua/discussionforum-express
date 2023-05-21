const express = require("express");
const router = express.Router();
const {
  addReply,
  getAllReplies,
  getAllRepliesByThreadId,
  updateReply,
  deleteReply,
} = require("../controllers/replyControllers");
const { isAuthenticated } = require("../middlewares/authSession");

// Route untuk menambah reply baru
router.post(
  "/questions/:question_id/threads/:thread_id/replies/:reply_id",
  addReply
);

// Router untuk mendapatkan semua data reply
router.get("/questions/:question_id/threads/replies", getAllReplies);

// Router untuk mendapatkan semua data reply berdasarkan thread_id
router.get(
  "/questions/:question_id/threads/:thread_id/replies",
  getAllRepliesByThreadId
);

// Router untuk update reply
router.put(
  "/questions/:question_idthreads/:thread_id/replies/:reply_id",
  updateReply
);

// Router untuk menghapus reply berdasarkan id
router.delete(
  "/questions/:question_id/threads/:thread_id/replies/:reply_id",
  deleteReply
);

module.exports = router;
