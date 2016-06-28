var config = require('../config/config');
var jwt = require('jwt-simple');


module.exports = function(req, res, next) {

  console.log("Checking access token");
  console.log(req.body);
  console.log(req.query);
  
  var token = (req.body && req.body.token) || 
                (req.query && req.query.token) || 
                req.headers['x-access-token'];
  if (token) {
    try {
      console.log('Token found');
        var decoded = jwt.decode(token, config.secret);
        console.log( decoded);
      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "message": "Token Expired"
        });
        return;
      }

        // Authorize the user to see if s/he can access our resources
        //console.log(decoded);

        req.authenticatedUser = decoded.username;

        next();

        //TODO figureout how to setup req.user without querying the
        //database for every request.


    } catch (err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Oops something went wrong",
        "error": err
      });
    }
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Unregistered Token or Key"
    });
    return;
  }
};
