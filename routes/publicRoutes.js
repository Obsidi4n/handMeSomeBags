var express = require('express');
var router = express.Router();


router.get('/register', function (req,res){
    res.sendFile('register.html', { root: __dirname+'/../public/pages' });
});

router.get('/', function(req, res) {
    res.sendFile('search.html', { root: __dirname+'/../public' });
});

router.get('/login', function(req, res) {
    res.sendFile('index.html', { root: __dirname+'/../public' });
});

router.get('/admin', function (req,res){
    res.sendFile('admin.html', { root: __dirname+'/../public/pages' });
});


exports.router = router;
