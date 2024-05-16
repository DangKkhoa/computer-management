const express = require('express');
const app = express.Router();
const userController = require('../controller/user.controller');
const { roleAuth } = require('../middleware/auth.middleware');
app.get('/change-password', userController.changePassword);
app.post('/change-password', userController.handleChangepassword);
app.get('/add', roleAuth, userController.add);
app.post('/add', roleAuth, userController.handleAdd)
app.get('/search', roleAuth, userController.search);
app.get('/detail/:id', roleAuth, userController.detail);
app.get('/delete/:id', roleAuth, userController.delete);
app.get('/', roleAuth, userController.index);

module.exports = app;