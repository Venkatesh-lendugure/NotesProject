var util = require('util');
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Venk@tesh143",
    database: 'notes',
    multipleStatements: true
});

conn.connect((err) => {
    if (err) console.log('Given detaits are not correct to connect database err is:', err);
    else console.log('Successfully connected to db....');
});
const query = util.promisify(conn.query).bind(conn);
module.exports = query;