const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");

const router = express.Router();

router.get("/:username", usersController.getUserByUsername);
router.post(
  "/signup",
  [
    check("username").not().isEmpty(),
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);
router.post("/login", usersController.login);
router.patch("/:username", usersController.updateUser);
module.exports = router;
