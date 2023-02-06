const express = require("express");
const router = express.Router();
const indexController = require("../controller/indexController.js");
const aboutController = require("../controller/aboutController.js");

router.get("/", indexController.get);
router.post("/", indexController.post);

router.get("/home", indexController.get);
router.post("/home", indexController.post);

router.get("/about", aboutController.get);

module.exports = router;
