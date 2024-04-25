const express = require('express');
const app = express.Router();

const sitesController = require('../controller/sites.controller');
const productController = require('../controller/product.controller');

app.get('/products/:category', sitesController.category)
app.get('/product/detail/:id', productController.detailForCustomer);
app.get('/', sitesController.shopping);

module.exports = app;