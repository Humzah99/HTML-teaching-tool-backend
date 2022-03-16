const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");

const router = express.Router();

router.get("/:userId", usersController.getUserById);
router.post(
    "/signup", [
        check("username").not().isEmpty(),
        check("firstname").not().isEmpty(),
        check("surname").not().isEmpty(),
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({ min: 6 }),
    ],
    usersController.signup
);
router.post("/login", usersController.login);
router.patch("/:userId", usersController.updateUser);
module.exports = router;