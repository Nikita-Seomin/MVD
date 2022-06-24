const express = require("express");
const router = express.Router();
const getController = require("./getController")

router.get ('/get', getController.getRows);

module.exports = router;