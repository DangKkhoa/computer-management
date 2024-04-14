// const { getUsers, verifyLoginService } = require('../service/user.service');
const { verifyLoginService } = require('../service/user.service');
// const passport = require('passport');
// const initializePassport = require('../config/passport.config');

// initializePassport(passport, verifyLoginService);

class authController {
    login(req, res) {
        if(!req.user) {
            return res.render('login');
        }
        
        return res.redirect('/');
    }
    handleLogin(req, res) {
        const { username, password } = req.body;
        const user = verifyLoginService(username, password);

        if(!username || !password) {
            return res.json({ code: 1, message: 'Username and Password cannot be empty' });
        }

        if(user) {
            req.session.user = user;
            return res.json({ code: 0, message: 'Login successfully' });
        }
        else {
            return res.json({ code: 2, message: 'Wrong Username or Password'});
        }



    }

    logout(req, res, next) {
        req.session.destroy();

        res.redirect('/auth/login');
    }
}

module.exports = new authController;