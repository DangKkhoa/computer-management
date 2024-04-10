const express = require('express');
const app = express.Router();
// const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');


app.post('/verify', authController.verifyLogin);
app.get('/', authController.login);

module.exports = app;