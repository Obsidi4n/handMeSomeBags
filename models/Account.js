var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path'),
    config = require(path.join(__dirname, '..', '/config/config.js')),
    bcrypt = require('bcrypt');


var SALT_WORK_FACTOR = 10;

var Account = new Schema({

    email: { type: String, required: true, lowercase:true, index: { unique: true } },
    username: { type: String, required: true,index: {unique: true}},
    // first_name: {type: String, required: true},
    // last_name: {type: String},
    phone_number: {type: Number, required: true, index: {unique: true}},
    verification_email: {type: Boolean, default: false},
    verification_phone: {type: Boolean, default: false},
    password: {type: String, required: true},

    // TODO: figure out how to deal with addresses

});



Account.pre('save', function(next) {
  var account = this;

  if (!account.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(account.password, salt, function(err, hash) {
        if (err) return next(err);
        account.password = hash;
        next();
    });
  });
});

Account.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(isMatch);
    });
};

var AccountModel  = mongoose.model('Account', Account);

module.exports = AccountModel;
