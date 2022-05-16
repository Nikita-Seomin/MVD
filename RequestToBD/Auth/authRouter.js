const express = require("express");
const router = express.Router();
const controller = require("./authController2")

router.post ("/login", controller.login)

module.exports = router;