var path = require('path');
var express = require('express');
var bodyparser = require('body-parser');
var router = express.Router();
var config = require('../config/config');


router.use(bodyparser.json());


var Account = require('../models/Account');

var jwt = require('jwt-simple');

// private method
function genToken(user) {
    console.log("generating token for "+ user)
    var expires = Date.now()+config.ttl;
    var token = jwt.encode({
        username: user,
        exp: expires
    }, config.secret);

    return {
        token: token,
        expires: expires,
        user: user
    };
}


router.post('/register', function(req, res) {
    var user_name = req.body.user_name || '';
    var password = req.body.password || '';
    var email = req.body.email || '';
    var first_name = req.body.first_name || '';
    var last_name = req.body.last_name || '';
    var phone_number = req.body.phone_number || '';

    console.log(req.body);
    if (user_name == '' || password == '' || first_name == '' || email == '') {
        return res.send(400);
    }
    // TODO: write more thorough checks for phone number and email fields

    var user = new Account();
    user.email = email;
    user.user_name = user_name;
    user.password = password;
    user.first_name = first_name;
    user.last_name = last_name;
    user.phone_number = phone_number;


    user.save(function(err, user){
        if(err) {
            console.log(err);
            res.status(500);
            return res.json({error: "Could not register"});
        }

        return res.json(genToken(user_name));
    });

});


router.post('/login',  function(req, res) {
    var username = req.body.user_name || '';
    var password = req.body.password || '';

    if (username == '' || password == '') {
        return res.status(401);
        return res.json({error: "invalid username or password"});
    }

    Account.findOne({user_name: username}, function (err, user) {
        if (err) {
            console.log(err);
            return res.status(401);
            return res.json({error: "invalid username or password"});
        }

        if (user == undefined) {
            return res.send(401);
        }

        user.comparePassword(password, function(isMatch) {
            if (!isMatch) {
                console.log("Attempt failed to login with " + user.username);
                return res.status(401);
                return res.json({error: "invalid username or password"});
            }

            return res.json(genToken(username));
        });
    });
});


router.all("*", function(req, res){
    res.status(404);
    res.json({error: "invalid api"});
})

exports.router = router;
