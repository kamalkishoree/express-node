const express = require("express");
const app = express();
const port = 5000;
const db = require("./config/db.js");
const Person = require("./models/person.js");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/person-add", async (req, res) => {
  try {
    const request = req.body;
    const newPerson = new Person(request);
    console.log(newPerson);
    const Savedperson = await newPerson.save();
    console.log("save");
    res
      .status(200)
      .json({ message: "person saved successfully", data: Savedperson });
  } catch (err) {
    console.log("not save");
    res.status(500).json({ error: "person not saved", status: 500 });
  }
});

app.get("/persons", async (req, res) => {
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

app.get("/person/:id", async (req, res) => {
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
app.patch("/person-update/:id", async (req, res) => {
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

app.delete("/person-delete/:id", async (req, res) => {
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

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});
