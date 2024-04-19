const { getUserByUsername, getUsersNotAdmin, getUserById, getUsersByName } = require('../model/user.model');
const con = require('../database/db');
const bcrypt = require('bcrypt');


function removePassword(user) {
    const {password, ...userData} = user;
    return userData;
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
    
    // console.log(usersNotAdmin);
}


async function verifyLoginService(username, password) {
    const user = await getUserByUsername(username)
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
    const user = await getUserById(id);
    console.log(user);
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

module.exports = { getUsers, verifyLoginService, getUserWithId, getUsersByNameService };