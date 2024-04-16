const { getUsers } = require('../service/user.service');

class userController {
    index(req, res) {
        let users = getUsers();
        res.render('staffs', {users: users, user: req.session.user});
    }
}


module.exports = new userController;