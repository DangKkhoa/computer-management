const { getAllCustomers } = require('../model/customer.model');

async function getAllCustomersService() {
    const customers = await getAllCustomers();
    return customers;
}

module.exports = { getAllCustomersService };