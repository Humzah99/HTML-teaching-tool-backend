const express = require("express");

const answerController = require("../controllers/answer-controller");

const router = express.Router();

router.get("/", answerController.getAllAnswers);
router.get("/:answerId", answerController.getAnswerById);
router.get("/user/:userId", answerController.getAnswerByUserId);
router.get("/forum/:questionId", answerController.getAnswerByQuestionId);
router.post(
  "/",
  answerController.addAnswer
);
router.patch(
  "/:answerId",
  answerController.updateAnswer
);
router.delete("/:answerId", answerController.deleteAnswer);
module.exports = router;
