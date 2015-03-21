var mongoose = require("mongoose");
// var cors = require("cors");
var Schema   = mongoose.Schema;
mongoose.connect('mongodb://localhost/simpleDB');

var userSchema = new Schema({
    username:String,
    password:String,
    email:String,
    contact:Number,
    last_update: { type: Date, default: Date.now }
});

var User = mongoose.model('Users',userSchema);
User.create()
// console.log(typeof(User));
module.exports.User = User;
