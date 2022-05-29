const express = require("express");
const router = express.Router();
const controller = require("./reqTableController")

router.post ('/postReqTable', controller.reqAdd)

module.exports = router;