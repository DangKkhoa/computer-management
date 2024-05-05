const express = require('express');
const app = express.Router();


const dashboardController = require('../controller/dashboard.controller');

app.post('/chart-data', dashboardController.dataOfChart);
app.get('/', dashboardController.index);

module.exports = app;