const express = require("express");
const router = express.Router();
const controller = require("./authController")

router.post ("/login", controller.login)

module.exports = router;