const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hey");
});

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.send("No page exists");
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.listen(PORT, () => console.log("Listening on port 3000"));
