// Libraries
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session')
const nocache = require('nocache');
const { rateLimit } = require('express-rate-limit');
// Routes
const inventoryRouter = require('./route/inventory.route')
const userRouter = require('./route/user.route');
const authRouter = require('./route/auth.route');
const shopRouter = require('./route/shop.route');
const saleRouter = require('./route/sale.route');
const customerRouter = require('./route/customer.route');
const profileRouter = require('./route/profile.route');
const dashboardRouter = require('./route/dashboard.route');
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

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
	standardHeaders: true,
	legacyHeaders: false,
})

app.use(limiter);
app.use('/customer', customerRouter);
app.use('/shop', shopRouter)
app.use('/auth', authRouter);
app.use('/', shopRouter)

app.use(isLoggedIn);

app.use('/profile', profileRouter);
app.use('/inventory', inventoryRouter);
app.use('/staffs', roleAuth, userRouter);
app.use('/sale-history', saleRouter);
app.use('/dashboard', dashboardRouter);


app.listen(3000, () => console.log('http://localhost:3000/auth/login'));
