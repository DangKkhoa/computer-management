const express = require('express');
const app = express.Router();

const sitesController = require('../controller/sites.controller');

app.get('/', sitesController.index);

module.exports = app;