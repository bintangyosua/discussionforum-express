const express = require("express");
const router = express.Router();
const threadControllers = require("../controllers/threadControllers");

// Router untuk menambah thread baru
router.post("/questions/:question_id/threads", threadControllers.createThread);

// Router untuk mendapatkan semua thread
router.get("/questions/threads", threadControllers.getAllThreads);

// Router untuk mendapatkan thread dengan id Question
router.get(
  "/questions/:question_id/threads",
  threadControllers.getThreadsByQuestionId
);

// Router untuk mendapatkan thread dengan id
router.get(
  "/questions/:question_id/threads/:thread_id",
  threadControllers.getThreadById
);

// Router untuk mengubah thread dengan id
router.put(
  "/questions/:question_id/threads/:thread_Id",
  threadControllers.updateThreadById
);

// Router untuk menghapus thread dengan id
router.delete(
  "/questions/:question_id/threads/:thread_id",
  threadControllers.deleteThreadById
);

module.exports = router;
