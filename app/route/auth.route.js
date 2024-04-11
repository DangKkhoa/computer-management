const express = require('express');
const app = express.Router();

const authController = require('../controller/auth.controller');


app.post('/', authController.handleLogin);
app.get('/', authController.login);

module.exports = app;