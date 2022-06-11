const express = require("express");
const router = express.Router();
const controller = require("./deleteRowReqTableController")

router.delete ('', controller.deleteRow)

module.exports = router;