const express = require("express");
const router = express.Router();
const getController = require("./getController")
const postController = require("./postController")

router.get ('/get', getController.getRows);
router.post ('/post', postController.addRow);

module.exports = router;