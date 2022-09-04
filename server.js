const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const User = require('./models/User');

dotenv.config();

const database = process.env.MONGOLAB_URI;
mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('connected to DB SUCCESS'))
.catch(err => console.log('FAILED to connect to DB', err));


app.get('/', async (request, response)=>{
    const user = await User.find();
    response.writeHead(200);
    response.write('ok, working, root, defently working');
    response.write(typeof user);
    response.write(user.toString());
    response.send();
});

app.set('view engine', 'ejs');

//Routes
// app.use('/', require('./routes/login'));


const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log("Server has started at port: " + PORT))
