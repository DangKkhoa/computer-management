const users = require('../model/user.model');

function getUsers() {
    const usersNotAdmin = []
    users.forEach((u) => {
        if(u.role !== 'ADMIN') {
            usersNotAdmin.push(u);
        }
    })

    return usersNotAdmin;
    
    // console.log(usersNotAdmin);
}

function verifyLoginService(username, password) {
    
    const user = users.find(u => username === u.username && password === u.password);
    if(user) {
        const {password, ...userData} = user;
        return userData;
    }
}

module.exports = { getUsers, verifyLoginService };