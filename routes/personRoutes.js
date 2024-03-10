const express = require("express");
const router = express.Router();
const Person = require("../models/person");
const { jwtAuthMiddleware, generateToken } = require("../config/JWT");
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
  const { req_username, req_password } = req.body;
  try {
    const user = Person.findOne({ username: req_username });
    if (!user) {
      res.status(401).json({ message: "invalid username" });
    }

    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);
    res.status(200).json({ token: token, message: "Login successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/create", async (req, res) => {
  try {
    console.log(req.body);
    const request = req.body;
    const newPerson = new Person(request);
    console.log(newPerson);
    const Savedperson = await newPerson.save();
    console.log("save");
    res
      .status(200)
      .json({ message: "person saved successfully", data: Savedperson });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "person not saved ", msg: err, status: 500 });
  }
});

router.get("/all", async (req, res) => {
  try {
    const all_persons = await Person.find();
    console.log(all_persons);
    res
      .status(200)
      .json({ message: "person find successfully", data: all_persons });
  } catch (err) {
    console.log("not find");
    res.status(500).json({ error: "person not find", status: 500 });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const person_data = await Person.findById(req.params.id);
    if (!person_data) {
      return res.status(404).json({ message: "person not found" });
    }
    res.json(person_data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update User by ID
router.patch("/update/:id", async (req, res) => {
  try {
    const person_data = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!person_data) {
      return res.status(404).json({ message: "person not found" });
    }
    res.json({ message: "Person updated", person_data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const person_data = await Person.findByIdAndDelete(req.params.id);
    if (!person_data) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.json({ message: "Person deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
