const express = require("express");
const router = express.Router();
const updateController = require("../../controllers/updateController");

router.put("/", updateController.updateUser);

module.exports = router;
