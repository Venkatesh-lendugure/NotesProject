var db = require('../database');
exports.addNotes = async (req, res) => {
    try {
        var path = req.file.destination+"//"+req.file.filename;
        const data = { userId: req.user.id,image:req.file.filename, title: req.body.title, description: req.body.description,path:path};
        //a new note is adding into notes table
        const result =  await db('INSERT INTO notes SET ?', data);
        if(result.length === 0) {
            throw new Error('user is not present to add a note');
        }else {
            throw new Error('New notes is added to the database successfully.....');
        }
    }catch (error) {
        res.status(500).send(error.message);
    }
}

exports.deleteNotes = async (req, res) => {
    try {
        id = req.params.id;
        if([req.user.Role] == 'admin') {
            //Checking  Given id is present or not in the users table
            const result1 = await db('SELECT * FROM notes.notes WHERE id = ?',id);
            if(result1.length !== 0) {
                // one record is deleting from notes table
                const result2 = await db('DELETE FROM  notes WHERE id = ? ', id);   
                res.status(201).send("successfully deleted a row from the notes table");//201 - success and  data is not sending
            }else {
                throw new Error('note book is not present to delete');
            }
        }else {
            throw new Error("you don't have access to delete the notes");
        }

    }catch (error) {
        res.status(500).send(error.message);
    }
}


exports.listofNotes = async (req, res) => {
    try {
        if ([req.user.Role] == "user") {
            // logged person is user then only that note information will be given
            var sql = "SELECT image,title, description,path,createdAt  FROM notes WHERE userId = ?";
            const result1 = await db(sql, [req.user.id]);
            res.status(200).send(result1);
        } else {
            // logged person is admin then all notes information will be send in the pages formate
            if((req.query.page === "") || (req.query.items === "")) throw new Error("your  given the value empty");
            else {
                var page = parseInt(req.query.page);
                var items = parseInt(req.query.items);
                if(items === 0 ||page === 0) throw new Error('page or items value is given Zero');
                else {
                    var skip = (page-1) * items;
                    var count = skip +','+items;
                    //List of notes using Pagination and getting number of comments on that note
                    const result = await db("SELECT n.id, n.title, n.description, n.createdAt, (select userName from users where users.id=n.userId) AS created_by, (SELECT COUNT(*) FROM comments  WHERE comments.noteId = n.id) AS no_of_Comments FROM notes N ORDER BY id LIMIT " + count);
                    res.status(200).send({result:result});
                }
            } 
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.fromDateNotesList = async (req, res) => {
    try {
        if(req.user.Role === 'admin') {
            var from_date = req.body.from_date;
            var last_date = req.body.last_date;
            var sql = 'SELECT userId,image,title,description,path,createdAt FROM notes WHERE createdAt BETWEEN ? AND ?';
            //when from and last date is given then between the dates data will be retriving from the notes table
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