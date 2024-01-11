'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', userSchema)