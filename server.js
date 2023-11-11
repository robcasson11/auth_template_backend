const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const PORT = 3500;

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing -- note corsOptions is passed in as arg
app.use(cors(corsOptions));

//Handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

//Handle JSON
app.use(express.json());

app.use(cookieParser({ secure: true }));

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use("/", require("./routes/root"));

//Everything after this line will need verify/access tokens
app.use(verifyJWT);
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
