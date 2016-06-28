var express = require('express');

var router = express.Router();

router.get('/admin_toDo', function (req,res){
    res.sendFile('admin.html', { root: __dirname+'/../public/pages' });
});

router.get('/userDashboard', function (req,res){
    res.sendFile('user.html', { root: __dirname+'/../public/pages' });
});

exports.router = router;
