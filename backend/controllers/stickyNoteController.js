'use strict'

var stickyNoteModel = require('../models/sticky-note.js');

var controller = {
    saveStickyNote: function (req,res) {
        let newStickyNote = new stickyNoteModel();

        newStickyNote.owner = req.body.owner;
        newStickyNote.title = req.body.title;
        newStickyNote.text = req.body.text;
        newStickyNote.positionX = req.body.positionX;
        newStickyNote.positionY = req.body.positionY;

        if( newStickyNote.owner == null || newStickyNote.title == null || newStickyNote.text == null || newStickyNote.positionX == null || newStickyNote.positionY == null) {
            return res.status(400).send({
                "message": "The petition is invalid.",
                "status": false
            })
        }

        newStickyNote.save().then((model) => {
            return res.status(200).send({
                "message": "Sticky Note saved succesfully!",
                "status": true,
                "data": model
            })
        }).catch((err)=>{
            return res.status(500).send({
                "message": "Something went wrong",
                "status": false,
                "Error": err
            });
        });
    },

    getStickyNotes: function (req,res) {
        let userId = req.body._id;

        if( userId == null || userId == undefined) {
            return res.status(400).send({
                "message": "The petition is invalid.",
                "status": false
            })
        }
        
        stickyNoteModel.find({"owner": userId}).then((stickyNotes) => {
            if(stickyNotes.length > 0){
                return res.status(200).send({
                    "message": stickyNotes
                })
            } else {    
                return res.status(404).send({
                    "message": "Nothing to show"
                })
            }
        }).catch((err)=>{
            return res.status(500).send({
                title: "Something went wrong",
                errorCode: err
            })
        })
    }
}

module.exports = controller;