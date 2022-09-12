const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const session = require("express-session");
const passport = require("passport");
const { loginCheck } = require("./auth/passport");
loginCheck(passport);

dotenv.config();

const database = process.env.MONGOLAB_URI;
mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("connected to DB SUCCESS"))
  .catch((err) => console.log("FAILED to connect to DB", err));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "oneboy",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Routes
// TODO:: add main page
app.use("/", require("./routes/login"));
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT;
app.listen(PORT, console.log("Server has started at port: " + PORT));
