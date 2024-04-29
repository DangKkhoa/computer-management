const express = require('express');
const app = express.Router();

const sitesController = require('../controller/sites.controller');
const productController = require('../controller/product.controller');

const shopController = require('../controller/shop.controller');
const { isCustomerLoggedin } = require('../middleware/customer.middleware');



app.get('/transaction-complete', shopController.transactionStatus);
app.post('/order-processing', shopController.orderProcessing)
app.get('/customer-info', shopController.customerInfo);
app.get('/my-cart', shopController.cart);
app.get('/search', shopController.search);
app.get('/products/:category', shopController.category)
app.get('/product/detail/:id', productController.detailForCustomer);
app.get('/', shopController.shopping);

module.exports = app;