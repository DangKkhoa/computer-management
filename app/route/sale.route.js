const express = require('express');
const app = express.Router();


const saleController = require('../controller/sale.controller');

app.get('/detail/:id', saleController.saleDetail);
app.get('/', saleController.index);

module.exports = app;