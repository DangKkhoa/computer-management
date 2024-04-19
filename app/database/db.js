const mysql2 = require('mysql2/promise');

const con = mysql2.createPool({
    
    connectionLimit: 20,
    host: 'localhost',
    user: 'dkkhoa',
    password: 'dkkhoa123',
    database: 'computer_management'
})

module.exports = con