const express = require("express");

const documentationController = require("../controllers/documentation-controller");

const router = express.Router();

router.get("/", documentationController.getAllDocumentation);
router.get("/randDoc", documentationController.getRandomDocumentation);
router.get("/:docId", documentationController.getDocumentationById);

module.exports = router;