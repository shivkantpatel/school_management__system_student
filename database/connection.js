const mysql = require('mysql2');

let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Shivkant77@',
    database:'school_management_system'
});


module.exports = connection