const path = require("path");

const displayIndex = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
};

module.exports = { displayIndex };
