const express = require("express");
const { check } = require("express-validator");

const scoreController = require("../controllers/score-controller");

const router = express.Router();

router.get("/", scoreController.getAllScores);
router.get("/:scoreId", scoreController.getScoreById);
router.get("/user/:userId", scoreController.getScoreByUserId);
router.get("/quiz/:quizId", scoreController.getScoreByQuizId);
router.post(
    "/", [check("score").not().isEmpty()],
    scoreController.addScore
);
router.delete("/:scoreId", scoreController.deleteScore);
module.exports = router;