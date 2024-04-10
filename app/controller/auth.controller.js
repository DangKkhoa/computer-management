const { getUsers, verifyLoginService } = require('../service/user.service');

class authController {
    login(req, res) {
        res.render('login');
    }

    verifyLogin(req, res) {
        // const users = getUsers();
        const { username, password } = req.body;
        console.log(req.body);
        console.log(username, password);
        const isVerified = verifyLoginService(username, password);
        if(isVerified) {
            res.json({code: 0, message: "Login successfully"});
        }
        else {
            res.json({code: 1, message: "Login fail"});
        }
    
    }
}

module.exports = new authController;