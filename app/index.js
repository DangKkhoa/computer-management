const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session')
const nocache = require('nocache');
// Routes
const inventoryRouter = require('./route/inventory.route')
const userRouter = require('./route/user.route');
const authRouter = require('./route/auth.route');
const homeRouter = require('./route/home.route');
const { isLoggedIn, roleAuth } = require('./middleware/auth.middleware');



app.set('views', path.join('./app/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(nocache());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false
}))


app.use('/auth', authRouter);
app.use('/', homeRouter);

app.use(isLoggedIn);

app.use('/inventory', inventoryRouter);
app.use('/staffs', roleAuth, userRouter);


app.listen(3000, () => console.log('http://localhost:3000'));