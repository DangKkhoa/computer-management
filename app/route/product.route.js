const express = require('express');
const app = express.Router();
const productController = require('../controller/product.controller');

app.use('/update/:id', productController.update);
app.use('/delete/:id', productController.delete);
// app.use('/detail/:id', productController.detail);
app.use('/', productController.index);

module.exports = app;
