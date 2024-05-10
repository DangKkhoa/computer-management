const { verifyLoginService, updatePasswordService } = require('../service/user.service');

class AuthController {
    login(req, res) {
        if(!req.user) {
            return res.render('login');
        }
        
        return res.redirect('/');
    }
    async handleLogin(req, res) {
        const { email, password } = req.body;
        const user = await verifyLoginService(email, password);
        if(!email || !password) {
            return res.json({ code: 1, message: 'Email and Password cannot be empty' });
        }

        if(user) {
            req.session.user = user;
            return res.json({ code: 0, message: 'Login successfully' });
        }
        else {
            return res.json({ code: 2, message: 'Wrong Email or Password'});
        }



    }

    logout(req, res) {
        req.session.destroy();

        res.redirect('/auth/login');
    }
}

module.exports = new AuthController;