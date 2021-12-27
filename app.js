var express = require('express');
var app = express();

var notesRouter = require('./Routes/notesRoutes');
var userRoutes =require('./Routes/usersRoutes');
var commentsRoutes = require('./Routes/commentsRoutes');
const port = 9000;

app.use(express.json());

app.use('/upload',express.static('Images'));    //to get the uploaded image

app.use('/notes', notesRouter);                 //notes Router
app.use('/users', userRoutes);                  //users Router
app.use('/comment',commentsRoutes);             //comments Router

app.listen(port, () => {
    console.log('server started running.....');
})