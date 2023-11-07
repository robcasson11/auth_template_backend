const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;

app.use(cors());

app.use("/", require("./routes/root"));

//Response for a url that doesn't exist
app.all("*", (req, res) => {
  //"*" or 'request all' won't return 404 since the route now exists so this returns a custom 404
  res.status(404);
  if (req.accepts("html")) {
    res.send("No page exists  R ERR");
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found R ERR" });
  } else {
    res.type("txt").send("404 Not Found R ERR");
  }
});

app.listen(PORT, () => console.log(`Listening on port ${3000}`));
