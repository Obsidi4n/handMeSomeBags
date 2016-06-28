var express = require('express');

var router = express.Router();

router.get('/abcendpoint', function(req, res){

    return res.json({success: "abc",
                     user: req.authenticatedUser,
                    });
});

exports.router = router;
