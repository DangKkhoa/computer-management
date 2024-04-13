const { getUsers } = require('../service/user.service');

class userController {
    index(req, res) {
        let users = getUsers();
        res.render('staffs', {users: users});
    }
}


module.exports = new userController;