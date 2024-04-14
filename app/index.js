const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session')
const nocache = require('nocache');
// Routes
const productRouter = require('./route/product.route')
const userRouter = require('./route/user.route');
const authRouter = require('./route/auth.route');
const homeRouter = require('./route/home.route');
const authMiddleware = require('./middleware/auth.middleware');



app.set('views', path.join('./app/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(nocache());
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false
}))


app.use('/auth', authRouter);
app.use(authMiddleware);


app.use('/products', productRouter);
app.use('/staffs', userRouter);
app.use('/', homeRouter);


app.listen(3000, () => console.log('http://localhost:3000'));