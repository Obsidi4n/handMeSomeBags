var express = require('express');
var logger = require('morgan');
var config = require('./config/config.js');
var mongoose = require('mongoose');


// var session = require('cookie-session');
app = express();

//app.use(logger('combined'));    //for logging requests

var publicRoutes = require('./routes/publicRoutes');
var publicApis = require('./routes/publicApis');
var authorizedRoutes = require('./routes/authorizedRoutes');
var restrictedApis = require('./routes/restrictedApis') 

var validateRequest = require('./middleware/validateRequest');



app.use(express.static(__dirname +'/public')); // serving public folder

app.use('/', publicRoutes.router); //mount all public routes

app.use('/public', publicApis.router); //mount public API calls here

app.use('/logged', validateRequest,  authorizedRoutes.router); //mount authorized entry pages here

app.use('/restricted', restrictedApis.router); //mount authorized API calls here

/*
currently has /register and /login end points, returns json with a
access token which has to be sent along with
*/

app.get('*',function(req,res){
    console.log("Mr.Anderson, you have to stay within the system");
    res.redirect('/');
});



mongoose.connect(config.mongo_url, function(){
    var server = app.listen(7896);
    console.log("I'm ready, listening on 7896");

})
