var express = require('express');
var router = express.Router();

var middlewares = require('../Middlewares/middlewares');
var userController = require('../Controllers/usersController');
var nodeMailer = require('../library/nodeMailer');

router.post('/register', middlewares.emailPassValidation, userController.register,nodeMailer);   //Registration 
router.post('/login', middlewares.emailPassValidation, userController.login);                    //login
router.post('/changepassword',middlewares.tokenValidate, userController.changePassword);         //changepassword
router.get('/', middlewares.tokenValidate, userController.usersList);                            //userslist or user information
router.post('/order_by_date',middlewares.tokenValidate,userController.fromDateUserList);         //by uing date getting users list
router.delete('/:id', middlewares.tokenValidate, userController.deleteUserAccount);              //delete user from users table

module.exports = router;