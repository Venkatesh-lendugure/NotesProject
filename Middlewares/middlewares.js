var validator = require('validator');           
var validateDate = require('validate-date');    
var jwt = require('jsonwebtoken');              

exports.emailPassValidation = (req, res, next) => {
    const emailId = req.body.emailId;
    if ((emailId.length >= 12) && (emailId.length <= 40)) {
        if (validator.isEmail(emailId)) {                     //Email Validation
            const password = req.body.password;
            if (password.length === 0) {
                res.send('password is should not be empty');
            } else if (password === " ") {
                res.send('Password should not be given empty');
            } else if ((password.length >= 5) && (password.length <= 15)) {
                let c = 0;
                for (let i = 0; i < password.length; i++) {
                    if (password[i] == " ") c++;
                }
                if (c == 0) {
                    next();                                        //Password Validation
                } else {
                    res.send('in Between password should not give spaces');
                }
            } else {
                res.send('Given password is not in the range of 5 to 15');
            }
        } else {
            res.send('Not a valid EmailId');
        }
    } else {
        res.send('Given EmailId Is not in the given Range between 10 to 40');
    }
};


exports.dateValidation = (req, res, next) => {
    var from_date = req.body.from_date;
    var last_date = req.body.last_date;
    if(from_date>last_date) res.send('from date is greater then last date');
    else {
        //validation for from_date and last_date 
        if (validateDate(from_date)) {
            if(validateDate(last_date)) {
                next();
            }else {
                res.send('Given date is not in the formate of YYYY/MM/DD',err);
            }
        } else {
            res.send('Given date is not in the formate of YYYY/MM/DD',err);
        }
    }
};


exports.tokenValidate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.send("you are not authorized");
    } else {
        jwt.verify(token, 'venky123', (err, result) => {    //JWT token verification
            if (err) {
                res.send("token is not valid " + err);
            } else {
                req.user = result;
                next();
            }
        })
    }
}
