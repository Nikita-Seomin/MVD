const express = require("express");
const router = express.Router();
const deleteController = require("./deleteController")
const getController = require("./getController")
const posController = require("./postController");
const controller = require("./updateController");

router.delete ('/delete', deleteController.deleteRow);
router.get ('/get', getController.getRows);
router.post ('/post', posController.addRow);
router.post('/update', controller.updateRow)
module.exports = router;