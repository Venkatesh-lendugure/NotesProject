var db = require('../database');

exports.addComments = async (req, res) => {
    try{
        var data = { user_Id:[req.user.id],noteId:req.params.id,comment:req.body.comment};
        //inserting comments into comments table
        const result = await db('INSERT INTO notes.comments SET ?', data);
        if(result.length === 0){
            throw new Error('your not given correctly ');
        }else {
            res.status(201).send('successfully submitted your comment into database');
        }
    }catch(error){
        res.status(500).send(error.message);
    }
}
exports.getComments =async (req, res) => {
    try {
        const noteId = req.params.id;
        //getting only sinle note with comments
        let result = await db('SELECT N.title,N.description,N.createdAt, U.userName AS created_by from notes N INNER JOIN users as U ON U.id = N.userId WHERE N.id = ?', noteId);
        if(result.length <1) throw new Error("Note id is ivalid");
        else {
          let comments = await db('SELECT C.comment, U.userName FROM comments C INNER JOIN users AS u ON U.id = C.user_Id WHERE noteId = ?', noteId);
          result[0].comment = comments;
          res.send(result)
        } 
    }catch(error) {
        res.status(500).send(error.message);
    }
 }