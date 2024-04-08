const accounts = require('../model/account.model');

function getAccounts() {
    return accounts;
}

module.exports = {getAccounts};