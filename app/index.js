const express = require('express');
const app = express();
const path = require('path');
const productRouter = require('./route/product.route')
const userRouter = require('./route/user.route');
const authRouter = require('./route/auth.route');

app.set('views', path.join('./app/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/login', authRouter);
app.use('/products', productRouter);
app.use('/staffs', userRouter);



app.listen(3000, () => console.log('http://localhost:3000'));