const bcrypt = require("bcryptjs");
LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

const loginCheck = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "name", passReqToCallback: true },
      (name, password, done) => {
        console.log("args", args);
        //Check customer
        User.findOne({ name: name })
          .then((user) => {
            if (!user) {
              console.log("wrong login");
              return done();
            }
            //Match Password
            bcrypt.compare(password, user.password, (error, isMatch) => {
              if (error) throw error;
              if (isMatch) {
                return done(null, user);
              } else {
                console.log("Wrong password");
                return done();
              }
            });
          })
          .catch((error) => console.log(error));
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user);
    });
  });
};

module.exports = {
  loginCheck,
};
