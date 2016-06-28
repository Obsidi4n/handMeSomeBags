var express = require('express');
var bodyparser = require('body-parser');
var router = express.Router();

router.use(bodyparser.json());

var User = require('../models/Account');
var Request = require('../models/Request');

router.get('/getAllUsers', function(req, res){
	User.find({},{password:0, _id: 0}, function (err, users) {
	    if (err) 
	    	return next(err);
	    res.json(users);
	});
});

router.post('/manualVerification', function(req, res){
	var username = req.body.username;
    var eVerify = req.body.verification_email;
    var pVerify = req.body.verification_phone;

    //Two of these params are booleans and need to be type checked
	if ( username && typeof(eVerify) != 'undefined'  && typeof(pVerify) != 'undefined' ){
		User.update({
						username: username
					},
					{
						verification_email: eVerify, 
					 	verification_phone: pVerify
					}, function (err, users) {
		    if (err) 
		    {
		    	console.log(err);
		    	res.status(403);
		    	res.json({error : 'Failed to update in db'});
		    }
		});
	}
	else
		console.log('Missing parameters for update');
	res.sendStatus(200);
});

router.get('/getAllRequests', function(req, res){
	Request.find({},{ _id: 0}, function (err, requests) {
	    if (err) 
	    	return next(err);
	    res.json(requests);
	  });
});

exports.router = router;