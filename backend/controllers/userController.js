'use strict'

const user = require('../models/user.js');
var userModel = require('../models/user.js');
var jwt = require('jsonwebtoken')
var fs = require('fs');
var path = require('path')
var bcrypt = require('bcrypt')

var controller = {
    login: function (req,res) {
        var userEmail = req.body.email;
        var userPassword = req.body.password;
        // The email is not provided or is undefined
        if(userEmail == null || userEmail == undefined){
            return res.status(404).send({
                "message": "The petition is invalid.",
                "status": false
            })
        }
        userModel.findOne({"email": userEmail})
        .then((model)=>{
            // The credentials are valid so we create the token
            if(model){
                // Password is compared to the hashed version
                bcrypt.compare(userPassword, model.password, (err, result) =>{
                    if (err) {
                        return res.status(404).send({
                            "message": "Error while hashing",
                            "status": false
                        });
                    }

                    // Correct password
                    if (result){
                        var aux_user = {
                            id: model._id,
                            name: model.name,
                            email: model.email,
                            password: model.password
                        }
    
                        //TODO Change the token password for a secure one
                        const token = jwt.sign(aux_user, "1234")
                        return res.status(200).send({
                            "message": "User login successfully.",
                            "token": token,
                            "status": true,
                            "userInformation": model
                        })
                    // Incorrect password
                    } else {
                        return res.status(404).send({
                            "message": "Invalid username or password",
                            "status": false
                        })
                    }
                });
            // Credentials are invalid
            } else {
                return res.status(404).send({
                    "message": "Invalid username or password",
                    "status": false
                })
            }
        })
    }
}

module.exports = controller;