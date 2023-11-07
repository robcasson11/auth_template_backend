const express = require("express");
const router = express.Router();
const path = require("path");

router.get(`^/$|index(.html)?`, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get(`/admin(.html)?`, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "admin.html"));
});

router.get(`/visitor(.html)?`, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "visitor.html"));
});

module.exports = router;
