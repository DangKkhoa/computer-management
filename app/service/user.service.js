const users = require('../model/user.model');

function getUsers() {
    return users;
}

function verifyLogin(username, password) {
    const verified = users.find(user => username === user.username && password === user.password);
    return verified;
}

module.exports = { getUsers, verifyLogin };