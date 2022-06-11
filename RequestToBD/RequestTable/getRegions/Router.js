const express = require("express");
const router = express.Router();
const getRegionsController = require("./getController")


router.get ('/get', getRegionsController.getRegions);

module.exports = router;