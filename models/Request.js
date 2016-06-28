var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path'),
    config = require(path.join(__dirname, '..', '/config/config.js'));

var Request = new Schema({

    user_name: { type: String, required: true,index: {unique: true}},
    id: { type: String, required: true, index: {unique: true}},
    type: {type: String, required: true, enum: ['Dispatch', 'Travelling']},
    quantity: {type: Number, required: true},

    from: {type: String, required: true},
    to: {type: String, required: true},

    verification_email: {type: Boolean, default: false},
});

var RequestModel  = mongoose.model('Requests', Request);

module.exports = RequestModel;