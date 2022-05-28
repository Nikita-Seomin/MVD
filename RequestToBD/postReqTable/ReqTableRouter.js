const express = require("express");
const router = express.Router();
const controller = require("./reqTableController")

console.log("errrrrr");
router.post ('/postReqTable', controller.reqAdd)

module.exports = router;