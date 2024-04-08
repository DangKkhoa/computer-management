const express = require('express');
const app = express.Router();
const productController = require('../controller/product.controller');

app.use('/:id', productController.update);
app.use('/', productController.index);

module.exports = app;
