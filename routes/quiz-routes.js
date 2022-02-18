const express = require("express");

const quizController = require("../controllers/quiz-controller");

const router = express.Router();

router.get("/", quizController.getAllQuizzes);
router.get("/:quizId", quizController.getQuizById);

module.exports = router;
