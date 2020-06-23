const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db");

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    (username, password, done) => {
      db.users.findOne({ email: username, password }).then((user) => {
        if (!user) {
          return done(null, false, { message: "Incorrect credentials." });
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  db.users.findOne({ _id: id }, (err, user) => {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});

module.exports = passport;
