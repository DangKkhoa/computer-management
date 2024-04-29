const express = require('express');
const app = express.Router();


const customerController = require('../controller/customer.controller');
const { isCustomerLoggedin } = require('../middleware/customer.middleware');

app.get('/login', customerController.login);
app.use('/my-order', isCustomerLoggedin, customerController.orders);
module.exports = app;