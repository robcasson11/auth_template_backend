const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const path = require("path");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const verifyJWT = require("../middleware/verifyJWT");

router.route(`^/$|index(.html)?`).get(verifyJWT, pageController.displayIndex);

// verifyRoles(ROLES_LIST.visitor, ROLES_LIST.admin);

router.get(`/visitor(.html)?`, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "visitor.html"));
});

verifyRoles(ROLES_LIST.admin);

router.get(`/admin(.html)?`, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "admin.html"));
});

module.exports = router;
