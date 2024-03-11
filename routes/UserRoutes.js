const express = require("express");
const router = express.Router();
const Person = require("../models/person");
const { jwtAuthMiddleware, generateToken } = require("../config/JWT");
const { use } = require("passport");
router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const request = req.body;
    const newPerson = new Person(request);
    console.log(newPerson);
    const Savedperson = await newPerson.save();
    console.log("data save");
    const token = generateToken({
      id: Savedperson.id,
      username: Savedperson.username,
    });
    console.log("token is :", token);

    res.status(200).json({
      message: "person saved successfully",
      data: Savedperson,
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "internal server error  not saved ",
      msg: err,
      status: 500,
    });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      req.headers.authorization.indexOf("Basic ") === -1
    ) {
      return res.status(401).json({ message: "Missing Authorization Header" });
    }

    // verify auth credentials
    const base64Credentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const [username, password] = credentials.split(":");

    const user = await Person.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }

    // Assuming comparePassword is an async function
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // Assuming generateToken is a synchronous function that generates a JWT
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);

    return res
      .status(200)
      .json({ token: token, message: "Login successfully" });
  } catch (err) {
    console.error(err); // It's good practice to log the error for debugging.
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
