var express = require('express');
var router = express.Router();

var middlewares = require('../Middlewares/middlewares');
var commentsController = require('../Controllers/commentsController');

router.post('/:id',middlewares.tokenValidate,commentsController.addComments);                   //comments posting into the comments table
router.get('/:id', middlewares.tokenValidate,commentsController.getComments);                  //getting only single note information 

module.exports = router;