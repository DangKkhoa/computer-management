const con = require('../database/db');
// const { addStaffService } = require('../service/user.service');

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

async function getUserByEmail(email) {
    const selectQuery = 'SELECT * FROM user WHERE email = ?';
    const param = [email];
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

async function addStaff(fullname, email, username, password, phone, date_of_birth, role, gender) {

    
    const selectResult = await getUserByEmail(email);
    if(selectResult.length == 0) {
        try {
            const insertQuery = 'INSERT INTO `user`(`email`, `password`, `username`, `fullname`, `role`, `phone`, `gender`) VALUES (?, ?, ?, ?, ?, ?, ?)'
            const insertParams = [email, password, username, fullname, role, phone, gender];
            const [insertResult] = await con.query(insertQuery, insertParams);
            return insertResult;
        }
        catch(err) {
            console.error(err);
            return false;
        }
    }
    else {
        return false;
    }
}

async function deleteUserById(id) {
    const deleteQuery = 'DELETE FROM user WHERE user_id = ?';
    const deleteParam = [id];
    const [deleteResult] = await con.query(deleteQuery, deleteParam);
    return deleteResult;
}

async function updateUserInfo(id, fullname, email, username, phone, gender, newUserPicture) {
    try {
        let updateQuery = 'UPDATE user set fullname = ?, email = ?'
        let updateParams = [fullname, email];

        if(username) {
            updateQuery += ', username = ?';
            updateParams.push(username);
        }
        if(phone) {
            updateQuery += ', phone = ?';
            updateParams.push(phone);
        }
        if(newUserPicture) {
            updateQuery += ', profile_picture = ?';
            updateParams.push(newUserPicture);
        }
        if(gender) {
            updateQuery += ', gender = ?';
            updateParams.push(gender);
        }


        updateQuery += ' WHERE user_id = ?'
        updateParams.push(id);

        const [updateResult] = await con.query(updateQuery, updateParams);
        if(updateResult.affectedRows > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    catch(err) {
        console.error(err)
        return false;
    }
}

async function getNumberOfStaffs() {
    const selectQuery = 'SELECT COUNT(*) as numOfStaffs FROM user WHERE NOT role = ?';
    const selectParam = ['ADMIN'];
    const result = await con.query(selectQuery, selectParam);
    console.log(result[0]);
    return result[0];
}

module.exports = { getUserByUsername, getUsersNotAdmin, getUserById, getUsersByName, addStaff, deleteUserById, getUserByEmail, updateUserInfo, getNumberOfStaffs };