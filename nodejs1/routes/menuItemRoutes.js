const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

router.post("/create", async (req, res) => {
  const inputData = req.body;
  try {
    const menu = new MenuItem(inputData);
    const savedMenu = await menu.save();
    console.log("menu item save successfully.");
    res
      .status(200)
      .json({ message: "Menu item saved Successfully", data: savedMenu });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Menu item has not been Saved.", error: err });
  }
});
module.exports = router;
