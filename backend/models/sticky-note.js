'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var stickyNoteSchema = schema({
    title: String,
    text: String,
    positionX: Number,
    positionY: Number
});

module.exports = mongoose.model('sticky-note', stickyNoteSchema)