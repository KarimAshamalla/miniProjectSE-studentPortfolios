//require depenciess
var express = require('express');
var router = require('./app/routes');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var DB_URI = "mongodb://localhost:27017/portfolio";
var path = require('path');
var session = require('express-session');
var flash = require('express-flash-messages');

var app = express();

app.set('view engine', 'ejs');

// configure app
app.use(bodyParser.urlencoded({extended:false}));
app.use('/public', express.static(__dirname + "/public"));
app.use(session({secret: 'ssshhhhh'}));
app.use(flash());

mongoose.connect(DB_URI);
app.use(router);


// start the server
app.listen(8080, function(){
    console.log("server is listening on port 8080");
})