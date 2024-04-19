const express = require('express');
const app = express.Router();
const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');


app.get('/add', userController.add);
app.get('/search', userController.search);
app.get('/detail/:id',userController.detail);
app.get('/delete/:id', userController.delete);
app.get('/', userController.index);

module.exports = app;