const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerView = (req, res) => {
  res.render("register", {});
};

// TODO:: rename name with login or nickname
const registerUser = (req, res) => {
  console.log("request", req);
  console.log(req.body);
  const { name, email, location, password, confirm } = req.body;
  if (!name || !email || !password || !confirm) {
    console.log("Fill empty fields");
  }
  //Confirm Passwords
  if (password !== confirm) {
    console.log("Password must match");
  } else {
    //Validation
    User.findOne({ email: email }).then((user) => {
      if (user) {
        console.log("email exists");
        res.render("register", {
          name,
          email,
          password,
          confirm,
        });
      } else {
        //Validation
        const newUser = new User({
          name,
          email,
          location,
          password,
        });
        //Password Hashing
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(res.redirect("/login"))
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
};

const loginView = (req, res) => {
  res.render("login", {});
};

const loginUser = passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
  failureFlash: true,
});
// (req, res) => {
//   const { name, password } = req.body;
//   //Required
//   if (!name || !password) {
//     console.log("Please fill in all the fields");
//     res.render("login", {
//       name,
//       password,
//     });
//   } else {
//     console.log("args", arguments);
//     passport.authenticate("local", {
//       successRedirect: "/dashboard",
//       failureRedirect: "/login",
//       failureFlash: true,
//     })(...arguments);
//   }
// };

module.exports = {
  registerView,
  loginView,
  registerUser,
  loginUser,
};
