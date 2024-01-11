'use strict'

// Cargo express para poder utilizar el router y crear las rutas
var express = require('express');

// Extraigo el controlador que es el que devuelve la respuesta
var userController = require('../controllers/userController.js')
var stickyNoteController = require('../controllers/stickyNoteController.js')

var router = express.Router();

// Rutas usuarios
router.post('/login', userController.login);
router.post('/register', userController.register);

// Rutas sticky notes
router.post('/save', stickyNoteController.saveStickyNote)
router.get('/stickyNotes', stickyNoteController.getStickyNotes)

module.exports = router;