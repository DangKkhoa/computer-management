const express = require('express');
const app = express.Router();


const authController = require('../controller/auth.controller');



app.post('/login', authController.handleLogin);
app.get('/login', authController.login);
app.get('/logout', authController.logout);

module.exports = app;