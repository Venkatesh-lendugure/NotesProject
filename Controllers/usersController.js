var db = require('../database');
var jwt = require('jsonwebtoken');
exports.register = async (req, res,next) => {
    try {
        var emailId = req.body.emailId;
        //checking user is present or not in users table
        const result =await db('SELECT id FROM users WHERE emailId = ?', emailId);
        if (result.length === 0) {
            const data = { userName: req.body.userName, emailId: req.body.emailId, password: req.body.password, Role: req.body.Role};
            //new user data will be inserted into users table    
            const result2 = await db('INSERT INTO users SET ?', data);
                    if (result2.length === 0) {
                        throw new Error('registration is failed...');
                    } else {
                        next();
                    }
            } else {
                throw new Error('user is already exist ');
        }
    }catch (error) {
        res.status(500).send(error.message);
    }
}

exports.login = async (req, res) => {
    try {
        emailId = req.body.emailId;
        password = req.body.password;
        //checking given emailId is present or not in users table
        const result = await db('SELECT * FROM users WHERE emailId = ?', emailId);
        if (result.length === 0) {
            throw new Error('user is not present');
        } else if (result[0].password === password) {
            //generating JWT token
            const token = jwt.sign({ id: result[0].id, emailId: result[0].emailId,Role:result[0].Role}, 'venky123');
            res.status(200).send({
                token
            })
        } else {
            throw new Error("Credentials not matched");
        }
    } catch (error) {
            res.status(500).send(error.message);
    }
}

exports.changePassword = async (req, res) => {
    try {
        var newpassword = req.body.password;
        //checking the given new password is same as old password
        const result = await db('SELECT password FROM users WHERE emailId = ?', [req.user.emailId]);
        if (result.length === 0) {
            throw new Error('user is not present');
        } else if (result[0].password !== newpassword) {
            let sql = `UPDATE  users SET password = ? WHERE id =?`;
            //Updating the new password in users table
            let data = [newpassword, req.user.id];
            const result1 = db(sql, data);
            res.status(201).send('successfully updated your password');
        } else {
            throw new Error('matched with old password give a new password');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.deleteUserAccount = async (req, res) => {
    try {
        id = req.params.id;
        if ([req.user.Role] == 'admin') {
            //checking given id is present or not in users table
            const result2 = await db('SELECT * FROM users WHERE id =?', id);
            if (result2.length !== 0) {
                //deleting the user account from users table
                const result1 = await db('DELETE FROM users WHERE id = ?', id);
                res.status(201).send('user account is successfully deleted');
            } else {
               throw new Error('user is not present to delete his account');
            }
        } else {
            throw new Error("you don't have access to delete account");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.fromDateUserList = async (req, res) => {
    try {
        if(req.user.Role === 'admin') {
            var from_date = req.body.from_date;
            var last_date = req.body.last_date;
            var sql = 'SELECT userName,emailId,Role,createdAt FROM users WHERE createdAt BETWEEN ? AND ?';
            //between given dates the users list is retriving
            const result =await db(sql,[from_date,last_date]);
            if(result.length === 0) {
                throw new Error('Not found the data');
            }else {
                res.status(200).send(result);
            }        
        }
    }catch(error) {
        res.status(500).send(error.message);
    }
}

exports.usersList = async (req, res) => {
    try {
        if (req.user.Role == 'admin') {
            var page = parseInt(req.query.page);
            var items = parseInt(req.query.items);
            var skip = (page-1) * items;
            var count = skip +','+items;
            const result2 = await db('SELECT * FROM users ORDER BY id LIMIT '+count);
            //pagination  And sending all users information
            res.status(200).send({result:result2});     

        } else {        
           var sql = "SELECT id, userName, (SELECT COUNT(*) FROM notes  WHERE notes.userId = users.id) AS notesCount FROM Users  WHERE id =?";
           const result3 = await db(sql,[req.user.id]);
           //only sending user data
           res.status(200).send(result3);       
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}