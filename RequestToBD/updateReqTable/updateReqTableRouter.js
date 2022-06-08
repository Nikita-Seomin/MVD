const express = require("express");
const router = express.Router();
const controller = require("./updateReqTableController")

router.post('', controller.reqUpdate)

module.exports = router;