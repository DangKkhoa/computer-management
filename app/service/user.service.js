const users = require('../model/user.model');

function getUsers() {
    return users;
}

function verifyLoginService(username, password) {
    
    const user = users.find(u => username === u.username && password === u.password);
    if(user) {
        const {password, ...userData} = user;
        return userData;
    }
}

module.exports = { getUsers, verifyLoginService };