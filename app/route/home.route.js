const express = require('express');
const app = express.Router();

const sitesController = require('../controller/sites.controller');
const productController = require('../controller/product.controller');
const { isLoggedIn } = require('../middleware/auth.middleware');

app.get('/', isLoggedIn, sitesController.dashboard)


module.exports = app;