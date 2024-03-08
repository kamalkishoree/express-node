const mongoose = require("mongoose");
require("dotenv").config();

//URL for Mongo
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/hotels";

//setup connection

mongoose.connect(DB_URL, {
  // useNewUrlParser:true,
  //useUnifiedTopology:true
});
//object for all handling event and oprations
const db = mongoose.connection;

db.on("connected", () => {
  console.log("mongo db connected");
});
db.on("error", () => {
  console.log("mongo db not connected");
});

//export connection
module.exports = db;
