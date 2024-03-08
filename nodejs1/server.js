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

//START -- Add Person API --//

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
//END -- Add Person API --//

//Start -- Add Person API --//
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
//END -- find all Person API --//

//Start -- find  Person with id API --//
app.get("/persons/:id", async (req, res) => {
  try {
    console.log(res.body);
    const persons = await Person.find({ userId: userid });
    console.log(persons);
    res
      .status(200)
      .json({ message: "person find successfully", data: all_persons });
  } catch (err) {
    console.log("not find");
    res.status(500).json({ error: "person not find", status: 500 });
  }
});
//End -- find  Person with id API --//

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
