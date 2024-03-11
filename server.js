const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const db = require("./config/db.js");
const bodyParser = require("body-parser");
const personRoutes = require("./routes/personRoutes.js");
const MenuItem = require("./routes/menuItemRoutes.js");
const UserRoutes = require("./routes/UserRoutes");

const passport = require("./config/Auth.js");
app.use(bodyParser.json());
const { jwtAuthMiddleware, generateToken } = require("./config/JWT.js");

app.use(passport.initialize());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
const AuthMiddleware = passport.authenticate("local", {
  session: false,
});

app.use("/person/", jwtAuthMiddleware, personRoutes);

app.use("/menu/", MenuItem);
app.use("/", UserRoutes);

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});
