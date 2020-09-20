require("dotenv/config");
const express = require('express');
const userRoute = require('./routes/user.route');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const port = 3200;
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.render('index');
})

app.use('/', userRoute);


mongoose.connect(process.env.DB_CONNECTION, function () {
    console.log("connected mongodb");
  });

app.listen(port, function(){
    console.log('Server listening on '+port);
});