'use strict'

var mongoose = require('mongoose');
var app = require('./app.js');
var port = 3700;
var bcrypt = require('bcrypt');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/sticky-notes-app')
        .then(() => {
            console.log("Conexion con MongoDB exitosa!")

            app.listen(port, () =>{
                console.log('Servidor escuchando en localhost:3700');
            })
        })
        .catch((err) => {
            console.log("Conexion con MongoDB erronea ", err)
        })