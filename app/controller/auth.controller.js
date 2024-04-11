const { getUsers, verifyLoginService } = require('../service/user.service');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

class authController {
    login(req, res) {
        res.render('login');
    }

    handleLogin(req, res, next) {
        // const users = getUsers();
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.render('login', { message: 'Invalid username or password' });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                // req.session.user = user.username;
                return res.redirect('/');
            });
        })(req, res, next);
    }
}

passport.use(new LocalStrategy(
    (username, password, done) => {
        const isVerified = verifyLoginService(username, password);
        if (isVerified) {
            return done(null, { username: username });
        } else {
            return done(null, false, { message: 'Incorrect username or password' });
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    // Here you might fetch user from database or other session storage
    done(null, { username: username });
});


module.exports = new authController;