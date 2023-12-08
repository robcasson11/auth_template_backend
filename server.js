require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = 3500;

connectDB();

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser({ secure: true }));

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/auth", require("./routes/Auth/auth"));
app.use("/refresh", require("./routes/Auth/refresh"));
app.use("/logout", require("./routes/Auth/logout"));
app.use("/", require("./routes/Views Routes/root"));

app.use(verifyJWT);

app.use("/user", require("./routes/API/user"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found R ERR" });
  } else {
    res.type("txt").send("404 Not Found R ERR");
  }
});

mongoose.connection.once("open", () => {
  app.listen(PORT);
});
