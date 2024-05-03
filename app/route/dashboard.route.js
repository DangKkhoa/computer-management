const express = require('express');
const app = express.Router();


const dashboardController = require('../controller/dashboard.controller');

app.get('/', dashboardController.index);

module.exports = app;