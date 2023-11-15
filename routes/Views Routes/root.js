const express = require("express");
const router = express.Router();
const path = require("path");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const verifyJWT = require("../../middleware/verifyJWT");

router.get(`^/$|index(.html)?`, verifyJWT, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get(
  `/visitor(.html)?`,
  verifyJWT,
  verifyRoles(ROLES_LIST.visitor, ROLES_LIST.admin),
  (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "visitor.html"));
  }
);

router.get(
  `/admin(.html)?`,
  verifyJWT,
  verifyRoles(ROLES_LIST.admin),
  (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "admin.html"));
  }
);

module.exports = router;
