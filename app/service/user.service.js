const users = require('../model/user.model');

function getUsers() {
    return users;
}

module.exports = { getUsers };