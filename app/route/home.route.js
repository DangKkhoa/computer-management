const express = require('express');
const app = express.Router();

const sitesController = require('../controller/sites.controller');
const productController = require('../controller/product.controller');
const { isLoggedIn } = require('../middleware/auth.middleware');

app.get('/dashboard', isLoggedIn, sitesController.dashboard)
app.get('/products/:category', sitesController.category)
app.get('/product/detail/:id', productController.detail);
app.get('/', sitesController.shopping);

module.exports = app;