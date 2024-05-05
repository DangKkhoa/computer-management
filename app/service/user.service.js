const { getUserByUsername, getUsersNotAdmin, getUserById, getUsersByName, addStaff, deleteUserById, getUserByEmail, updateUserInfo } = require('../model/user.model');
const con = require('../database/db');
const bcrypt = require('bcrypt');

const { sendEmailService } = require('./sendEmail.service');


function removePassword(user) {
    const {password, ...userData} = user;
    return userData;
}

function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
}

async function getUsers() {
    const users = await getUsersNotAdmin();
    let usersNotAdmin = [];
    if(users.length > 0) {
        users.forEach((user) => {
            usersNotAdmin.push(removePassword(user));
        }) 
    }

    return usersNotAdmin;
}


async function verifyLoginService(email, password) {
    const user = await getUserByEmail(email)
    if(user.length > 0) {
        const passwordMatched = bcrypt.compareSync(password, user[0].password);
        if(passwordMatched) {
            const userData = removePassword(user[0]);
            return userData;
        }
    }
    else {
        return false;
    }
}

async function getUserWithId(id) {
    const user = await getUserById(parseInt(id));
    
    if(user.length > 0) {
        const userData = removePassword(user[0]);
        return userData;
    }
    
}

async function getUsersByNameService(name) {
    let usersByName = [];
    const users = await getUsersByName(name);
    if(users.length > 0) {
        users.forEach((user) => {
            usersByName.push(removePassword(user));
        })
        
    }

    return usersByName;
}

async function addStaffService(fullname, email, phone, date_of_birth, role, gender) {
    try {
        const saltRounds = 10;
        if(!fullname || !email) {
            return {code: 1, message: 'Fullname and email cannot be empty!'};
        }
        else if(!validateEmail(email)) {
            return {code: 3, message: 'Invalid email address!'};
        }
        else {    
            const username = email.split('@')[0]; // username is the part before the '@';
            const hashedPassword = await bcrypt.hash(username, saltRounds);
            
            // send data to database
            const addResult = await addStaff(fullname, email, username, hashedPassword, phone, date_of_birth, role, gender);
            if(addResult.affectedRows > 0) {
                sendEmailService(email, username);
                return {code: 0, message: 'Staff added successfully'};
            }
            else {
                return {code: 2, message: 'Something went wrong! Please make sure that staff was not added!'};
            }
        }
    }
    catch(err) {
        console.error(err);
        return {code: 2, message: 'Something went wrong! Please make sure that staff was not added!'};
    }
    
    
}

async function deleteUserByIdService(id) {
    try {
        const deleteResult = await deleteUserById(id);
        if(deleteResult.affectedRows > 0) {
            return true;
        }
    }
    catch(err) {
        console.error(err);
        return false;
    }
    
}


async function updateUserInfoService(id, fullname, email, username, phone, gender, userPicture) {

    if(!fullname || !email) {
        return {code: 2, message: 'Please provide fullname and email'};
    }
    
    else {
        
        if(!userPicture) {
            var newUserPicture = null;
        }
        else {
            var newUserPicture = userPicture.filename;
        } 
        const isUpdated = await updateUserInfo(id, fullname, email, username, phone, gender, newUserPicture);
        
        if(isUpdated) {
            return {code: 0, message: 'User info updated successfully'};
        }
        else {
            return {code: 1, message: 'Something went wrong. Please try again'};
        }
    }

    
}

module.exports = { getUsers, verifyLoginService, getUserWithId, getUsersByNameService, addStaffService, deleteUserByIdService, updateUserInfoService };