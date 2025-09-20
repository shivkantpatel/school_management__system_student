const mysql = require('mysql2');
let connection = mysql.createConnection({

  host: 'localhost',           //
    user: 'root',                         
    password: 'Shivkant77@',
    database: 'school_management_system'
});
// let connection = mysql.createConnection({

//     host: 'metro.proxy.rlwy.net',           // ✅ Correct Railway host
//     user: 'root',
//     port: 26525,                            // ✅ Correct Railway port
//     password: 'sLNcmhAoURrTLIVBfvwORoezBHfJaaWe',
//     database: 'school_management_system'
// });



module.exports = connection