const express = require("express");
const { check } = require("express-validator");
const checkAuth = require("../middleware/check-auth")
const forumController = require("../controllers/forum-controller");

const router = express.Router();



router.get("/", forumController.getAllForums);
router.get("/:questionId", forumController.getForumQuestionById);

router.use(checkAuth);

router.get("/user/:userId", forumController.getForumQuestionByUserId);
router.post(
  "/",
  [check("heading").not().isEmpty(), check("text").isLength({ min: 5 })],
  forumController.addQuestion
);
router.patch(
  "/:questionId",
  [check("heading").not().isEmpty(), check("text").isLength({ min: 5 })],
  forumController.updateQuestion
);
router.delete("/:questionId", forumController.deleteQuestion);
module.exports = router;
