'use strict'
var jwt = require('jsonwebtoken')
let tokenPassword = "ijwef93jj0>:e.DE;DEDJOje.ED';..'DEADIidj"

var controller = {
    getToken: function (user) {
        let duration = 30*60;
        return jwt.sign(user, tokenPassword, {expiresIn: duration})
    },
    verifyToken: function(token){
        try {
            return jwt.verify(token, tokenPassword);
        } catch (error) {
            return false;
        }
    }
}

module.exports = controller;