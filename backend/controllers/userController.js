'use strict'

var userModel = require('../models/user.js');
var bcrypt = require('bcrypt')
var tokenPassword = require('./global.js')
var jwt = require('jsonwebtoken')

var controller = {
    login: function (req,res) {
        let userEmail = req.body.email;
        let userPassword = req.body.password;
        // The email is not provided or is undefined
        if((userEmail == null || userEmail == undefined) || (userPassword == null || userPassword == undefined)){
            return res.status(400).send({
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
                        return res.status(500).send({
                            "message": "Error while hashing",
                            "status": false,
                            "error": err
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

                        const token = jwt.sign(aux_user, tokenPassword);

                        return res.status(200).send({
                            "message": "User login successfully.",
                            "token": token,
                            "status": true,
                            "userInformation": model
                        })
                    // Incorrect password
                    } else {
                        return res.status(200).send({
                            "message": "Incorrect password",
                            "status": false
                        })
                    }
                });
            // Invalid email
            } else {
                return res.status(200).send({
                    "message": "User not found",
                    "status": false
                })
            }
        }).catch((err)=>{
            return res.status(500).send({
                "message": "Something went wrong",
                "status": false,
                "error": err
            });
        })
    },
    register: async function (req,res) {
        var new_user = new userModel();
        
        new_user.name = req.body.name;
        new_user.email = req.body.email;
        new_user.password = await bcrypt.hash(req.body.password, 10);

        // The email is not provided or is undefined
        if((new_user.name  == null || new_user.name  == undefined) || (new_user.email == null || new_user.email == undefined) || (new_user.password == null || new_user.password == undefined)){
            return res.status(400).send({
                "message": "The petition is invalid.",
                "status": false
            })
        }

        new_user.save().then((model) => {
            return res.status(200).send({
                "message": "Registration succesful!",
                "status": true,
                "data": model
            })
        }).catch((err)=>{
            return res.status(500).send({
                "message": "Something went wrong",
                "status": false,
                "Error": err
            });
        })
    }
}

module.exports = controller;