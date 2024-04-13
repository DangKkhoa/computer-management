const express = require('express');
const app = express.Router();
const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');


app.get('/', userController.index);

module.exports = app;