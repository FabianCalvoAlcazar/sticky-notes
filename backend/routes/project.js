'use strict'

// Cargo express para poder utilizar el router y crear las rutas
var express = require('express');

// Extraigo el controlador que es el que devuelve la respuesta
var userController = require('../controllers/userController.js')

var router = express.Router();

router.post('/login', userController.login);

module.exports = router;