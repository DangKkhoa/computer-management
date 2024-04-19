const con = require('../database/db');


async function getUserByUsername(username) {
    const selectQuery = 'SELECT * FROM user WHERE username = ?';
    const param = [username];
    try {
        const [result] = await con.query(selectQuery, param);
        return result;
    } 
    catch(err) {
        console.error(err);
        return false;
    }
    
}

async function getUsersNotAdmin() {
    const selectQuery = 'SELECT * FROM user WHERE NOT role = ?';
    const param = ['ADMIN'];
    try {
        const [result] = await con.query(selectQuery, param);
        return result;
    } 
    catch(err) {
        console.error(err);
        return false;
    }
}

async function getUserById(id) {
    const selectQuery = 'SELECT * FROM user WHERE user_id = ?';
    const userId = parseInt(id);
    const param = [userId];
    try {
        const [result] = await con.query(selectQuery, param);
        return result;
    } 
    catch(err) {
        console.error(err);
        return false;
    }
}

async function getUsersByName(name) {
    const selectQuery = 'SELECT * FROM user WHERE fullname LIKE ?';
    
    const param = ['%' + name + '%'];
    try {
        const [result] = await con.query(selectQuery, param);
        return result;
    } 
    catch(err) {
        console.error(err);
        return false;
    }
}


module.exports = { getUserByUsername, getUsersNotAdmin, getUserById, getUsersByName };