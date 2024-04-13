// const { getUsers, verifyLoginService } = require('../service/user.service');
const { verifyLoginService } = require('../service/user.service');
const passport = require('passport');
const initializePassport = require('../config/passport.config');

initializePassport(passport, verifyLoginService);

class authController {
    login(req, res) {
        if(!req.user) {
            return res.render('login', { message: req.flash('error')});
        }
        
        return res.redirect('/');
    }
    handleLogin(req, res, next) {
        passport.authenticate('local', {
            successRedirect: true,
        }, (err, user, info) => {
            if(err) return next(err);
            if(!user) {
                return res.json({code: 1, message: 'User does not exist'});
            }
            
            req.logIn(user, (err) => {
                if(err) return next(err);
                return res.json({code: 0, message: 'Login successfully'});
            })
        })(req, res, next);
    }

    logout(req, res, next) {
        req.logout((err) => {
            if (err) { 
                return next(err); 
            }
            
            return res.redirect('/auth/login');
        })
    }
}

module.exports = new authController;