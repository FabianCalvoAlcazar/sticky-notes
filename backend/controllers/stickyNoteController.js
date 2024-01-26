'use strict'

var jwt = require('jsonwebtoken')
let tokenPassword = require('./global.js')

let stickyNoteModel = require('../models/sticky-note.js');

var controller = {
    getStickyNotes: function (req,res) {
        let userId = req.params.user_id;

        if( !req.headers.authorization || userId == null || userId == undefined ) {
            return res.status(400).send({
                "message": "The petition is invalid.",
                "status": false
            })
        }

        let userToken = req.headers.authorization.split(" ")[1];

        if( userToken == null || userToken == undefined ) {
            return res.status(400).send({
                "message": "The petition is invalid.",
                "status": false
            })
        }

        try {
            var user = jwt.verify(userToken, tokenPassword);
        } catch (error) {
            return res.status(500).send({
                title: "Wrong Token",
                error: error
            })
        }

        stickyNoteModel.find({"owner": userId}).then((stickyNotes) => {
            if(stickyNotes.length > 0){
                return res.status(200).send({
                    "user": {
                        "id": user.id,
                        "name": user.name,
                        "email": user.email,
                    },
                    "message": stickyNotes
                })
            } else {    
                return res.status(200).send({
                    "user": {
                        "id": user.id,
                        "name": user.name,
                        "email": user.email,
                    },
                    "message": "Nothing to show"
                })
            }
        }).catch((err)=>{
            return res.status(500).send({
                title: "Something went wrong",
                errorCode: err
            })
        })
    },

    saveStickyNote: function (req,res) {
        let newStickyNote = new stickyNoteModel();

        newStickyNote.owner = req.body.owner;
        newStickyNote.title = req.body.title;
        newStickyNote.text = req.body.text;
        newStickyNote.positionX = req.body.positionX;
        newStickyNote.positionY = req.body.positionY;

        if( !req.headers.authorization || newStickyNote.owner == null || newStickyNote.title == null || newStickyNote.text == null || newStickyNote.positionX == null || newStickyNote.positionY == null) {
            return res.status(400).send({
                "message": "The petition is invalid.",
                "status": false
            })
        }

        let userToken = req.headers.authorization.split(" ")[1];

        try {
            jwt.verify(userToken, tokenPassword);

            newStickyNote.save().then((model) => {
                return res.status(200).send({
                    "message": "Sticky Note saved succesfully!",
                    "status": true,
                    "data": model
                })
            })
        } catch (error) {
            return res.status(401).send({
                "message": "Something went wrong.",
                "status": false
            })
        }
    },

    updateStickyNote: function (req,res) {
        let stickyNoteId = req.body._id;
        let updatedStickyNote = req.body;

        if( stickyNoteId == null || !req.headers.authorization || updatedStickyNote == null) {
            return res.status(400).send({
                "message": "The petition is invalid.",
                "status": false
            })
        }

        let userToken = req.headers.authorization.split(" ")[1];

        try {
            jwt.verify(userToken, tokenPassword);

            stickyNoteModel.findByIdAndUpdate(stickyNoteId, updatedStickyNote, {new:true}).then((updated) => {
                if(!updated) {
                    return res.status(404).send({
                        "message": "Nothing to show",
                        "status": false
                    })
                }
                return res.status(200).send({
                    "message": "Sticky Note Updated Succesfully!",
                    "status": true,
                    "data": updated
                })
            })
        } catch (error) {
            return res.status(401).send({
                "message": "Something went wrong.",
                "status": false,
                "error": error
            })
        }
    }, 
    deleteStickyNote: function (req, res) {

        let stickyNoteId = req.body._id;

        if( stickyNoteId == null || !req.headers.authorization) {
            return res.status(400).send({
                "message": "The petition is invalid.",
                "status": false
            })
        }

        let userToken = req.headers.authorization.split(" ")[1];

        try {
            jwt.verify(userToken, tokenPassword);

            stickyNoteModel.findByIdAndDelete(stickyNoteId).then((stickyNoteDeleted)=>{
                if(!stickyNoteDeleted) {
                    return res.status(200).send({
                        "message": "Sticky Note not found.",
                        "status": false
                    })
                }
                return res.status(200).send({
                    "message": "Sticky Note deleted succesfully.",
                    "data": stickyNoteDeleted,
                    "status": true
                })
            })

        } catch (error) {
            return res.status(401).send({
                "message": "Something went wrong.",
                "status": false,
                "error": error
            })
        }
    }
}

module.exports = controller;