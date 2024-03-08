const express = require("express");
const app = express();
const port = 5000;
const db = require("./config/db.js");
const bodyParser = require("body-parser");
const personRoutes = require("./routes/personRoutes.js");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/person/", personRoutes);

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});
