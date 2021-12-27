var express = require('express');
var router = express.Router();

var upload = require('../Middlewares/upload');
var middlewares = require('../Middlewares/middlewares');
var notesController  = require('../Controllers/notesController');

router.post('/addnotes',middlewares.tokenValidate, upload.single("image"), notesController.addNotes); //new note is posting in  notes table
router.delete('/:id', middlewares.tokenValidate, notesController.deleteNotes);                        //deleting a note from notes table
router.get('/', middlewares.tokenValidate, notesController.listofNotes);                              //getting list of notes from notes table
router.post('/order_by_date',middlewares.dateValidation,middlewares.tokenValidate,notesController.fromDateNotesList);//by using date getting  list of notes         


module.exports = router;