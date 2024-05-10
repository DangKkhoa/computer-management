const express = require('express');
const app = express.Router();
const userController = require('../controller/user.controller');

app.get('/change-password', userController.changePassword);
app.post('/change-password', userController.handleChangepassword);
app.get('/add', userController.add);
app.post('/add', userController.handleAdd)
app.get('/search', userController.search);
app.get('/detail/:id',userController.detail);
app.get('/delete/:id', userController.delete);
app.get('/', userController.index);

module.exports = app;