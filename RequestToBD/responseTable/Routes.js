const express = require("express");
const router = express.Router();
const getLinksController = require("./LinksPage/getLinksOnUser");
const postLinksController = require("./resTablePage/save");

router.get('/get', getLinksController.getLinksOnPage);
router.post('/post', postLinksController.saveAnswer);

module.exports = router;