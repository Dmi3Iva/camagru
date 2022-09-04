const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const res = require('express/lib/response');

dotenv.config();
// Mongo DB connection
const database = process.env.MONGOLAB_URI;
mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('connected to DB SUCCESS'))
.catch(err => console.log('FAILED to connect to DB', err));

app.get('/', (request, response)=>{
    response.writeHead(200);
    response.write('ok, working, root, defently working');
    response.send();
});

app.get('/users', (request, response)=>{
    response.writeHead(200);
    response.write('ok, working, users');
    response.send();
});

app.set('view engine', 'ejs');

//Routes
// app.use('/', require('./routes/login'));


const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log("Server has started at port: " + PORT))
