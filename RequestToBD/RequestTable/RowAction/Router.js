const express = require("express");
const router = express.Router();
const deleteController = require("./deleteController")
const getController = require("./getController")
const posController = require("./postController");
const updateController = require("./updateController");
const getChangesController = require("./auxiliaryFunctions/getChanges");

router.delete ('/delete', deleteController.deleteRow);
router.get ('/get', getController.getRows);
router.post ('/post', posController.addRow);
router.post('/update', updateController.updateRow)

router.get ('/changes/get',getChangesController.getChanges);

module.exports = router;