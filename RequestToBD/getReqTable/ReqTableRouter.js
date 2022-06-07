const express = require("express");
const router = express.Router();
const controller = require("./reqTableController")

router.get ('', controller.getRows)

module.exports = router;