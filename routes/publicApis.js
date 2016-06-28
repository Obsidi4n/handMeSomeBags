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
    var username = req.body.username || '';
    var password = req.body.password || '';
    var email = req.body.email || '';
    // var first_name = req.body.first_name || '';
    // var last_name = req.body.last_name || '';
    var phone_number = req.body.contact || '';

    console.log(req.body);
    if (username == '' || password == '' || phone_number == '' || email == '') {
        res.status(401);
        return res.json({error: "Empty username or password"});
    }
    // TODO: write more thorough checks for phone number and email fields

    var user = new Account();
    user.email = email;
    user.username = username;
    user.password = password;
    // user.first_name = first_name;
    // user.last_name = last_name;
    user.phone_number = phone_number;


    user.save(function(err, user){
        if(err) {
            console.log(err);
            res.status(500);
            return res.json({error: "Could not register"});
        }
        var respjson = genToken(username);
        respjson['location'] = '/logged/userDashboard';
        return res.json(respjson);
    });

});


router.post('/login',  function(req, res) {
    console.log('logging in')
    console.log(req.body);
    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username == '' || password == '') {
        res.status(401);
        return res.json({error: "Empty username or password"});
    }

    Account.findOne({username: username}, function (err, user) {
        if (err) {
            console.log(err);
            res.status(401);
            return res.json({error: "Invalid username or password"});
        }

        if (user == undefined) {
            res.status(401);
            return res.json({error: "Username not found"});
        }

        user.comparePassword(password, function(isMatch) {
            if (!isMatch) {
                console.log("Password mismatch. Attempt failed to login with " + user.username);
                res.status(401);
                return res.json({error: "invalid username or password"});
            }
            console.log('User authentication successful');
            var respjson = genToken(username);
            respjson['location'] = '/logged/userDashboard';
            return res.json(respjson);
        });
    });
});


// router.all("*", function(req, res){
//     res.status(404);
//     res.json({error: "invalid api"});
// })

exports.router = router;
