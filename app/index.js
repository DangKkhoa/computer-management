const express = require('express');
const app = express();
const path = require('path');
const productRouter = require('./route/product.route')

app.set('views', path.join('./app/views'));
app.set('view engine', 'ejs');

app.use('/', productRouter);


app.listen(3000, () => console.log('http://localhost:3000'));