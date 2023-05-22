const express = require("express");
const router = express.Router();
const {
  addQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestionById,
  getQuestionAnswerCount,
} = require("../controllers/questionControllers");

router.post("/questions/add-question", addQuestion);

router.get("/questions", getAllQuestions);

router.get("/questions/:question_id", getQuestionById);

router.put("/questions/:question_id/edit-question", updateQuestion);

router.delete("/questions/:question_id", deleteQuestionById);

//! GET all answer count of question
router.get("/questions/:question_id/answer-count", getQuestionAnswerCount);

module.exports = router;
