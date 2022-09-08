const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const User = require('./models/User');
const session = require('express-session');

dotenv.config();

const database = process.env.MONGOLAB_URI;
mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('connected to DB SUCCESS'))
.catch(err => console.log('FAILED to connect to DB', err));


app.set('view engine', 'ejs');

app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
  }));

//Routes
app.use('/', require('./routes/login'));
app.use(express.urlencoded({extended: false}));


const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log("Server has started at port: " + PORT))
