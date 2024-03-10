const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("../models/person");

passport.use(
  new LocalStrategy(async (req_username, req_password, done) => {
    try {
      console.log("Recieved crendetials :", req_username, req_password);
      const user = await Person.findOne({ username: req_username });
      if (!user) {
        return done(null, false, { message: "user not found" });
      }
      const isPasswordMatch = (await user.comparePassword(req_password))
        ? true
        : false;
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);
module.exports = passport;
