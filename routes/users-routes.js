const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/:userId", usersController.getUserById);
router.post(
    "/signup",
    fileUpload.single('image'), [
    check("username").not().isEmpty(),
    check("firstname").not().isEmpty(),
    check("surname").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
    ],
    usersController.signup
);
router.post("/login", usersController.login);
router.post("/forgotPassword", usersController.forgotPassword);
router.get("/verifyToken/:token", usersController.verifyToken);
router.get("/verify/:token", usersController.verifyEmail);
router.post("/resetPassword", usersController.resetPassword);
router.patch("/:userId", usersController.updateUser);
module.exports = router;