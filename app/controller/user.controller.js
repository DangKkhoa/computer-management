const { getUsers, getUserWithId, getUsersByNameService } = require('../service/user.service');

class userController {
    async index(req, res) {
        let users = await getUsers();
        // console.log(users);
        res.render('staffs', {users: users, user: req.session.user});
    }

    delete(req, res) {
        const userId = req.params.id;
        res.send(`Delete user with id=${userId}`);
    }

    async detail(req, res) {
        // console.log(req.params);
        try {
            const userId = parseInt(req.params.id);
            const user = await getUserWithId(userId);
            
            if(user) {
                console.log(user)
                res.status(200).json(user);
            }
            else {
                res.status(404).json({error: 'User not found'});
            }
        }
        catch(err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error'});
        }
        
    }

    async search(req, res) {
        const { name } = req.query;
        const users = await getUsersByNameService(name);
        
        if(users.length > 0) {
            res.render('staffs', {users: users, user: req.session.user});
        }
        else {
            res.render('staffs', {users: [], user: req.session.user});
        }
    }

    add(req, res) {
        res.render('addStaff', {user: req.session.user});
    }

    
}


module.exports = new userController;