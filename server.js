const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const PORT = 3500;

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/api/users"));

//Response for a url that doesn't exist
app.all("*", (req, res) => {
  //"*" or 'request all' won't return 404 since the route now exists so this returns a custom 404
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found R ERR" });
  } else {
    res.type("txt").send("404 Not Found R ERR");
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
