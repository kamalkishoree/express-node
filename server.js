const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 5000;
const db = require("./config/db.js");
const bodyParser = require("body-parser");
const personRoutes = require("./routes/personRoutes.js");
const MenuItem = require("./routes/menuItemRoutes.js");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/person/", personRoutes);
app.use("/menu/", MenuItem);

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});
