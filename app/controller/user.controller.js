const { getUsers, getUserWithId, getUsersByNameService, addStaffService, deleteUserByIdService } = require('../service/user.service');

class userController {
    async index(req, res) {
        let users = await getUsers();
        // console.log(users);
        res.render('staffs/staffs', {users: users, user: req.session.user});
    }

    async delete(req, res) {
        const userId = req.params.id;
        const isDeleted = deleteUserByIdService(parseInt(userId));
        
        if(isDeleted) {
            res.json({code: 0, message: 'Staff deleted successfully'});
        }
        else {
            res.json({code: 1, message: 'Cannot delete staff. Please try agin'});
        }
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
            res.render('staffs/staffs', {users: users, user: req.session.user});
        }
        else {
            res.render('staffs/staffs', {users: [], user: req.session.user});
        }
    }

    add(req, res) {
        res.render('staffs/addStaff', {user: req.session.user});
    }

    async handleAdd(req, res) {
        const { fullname, email, phone, dateOfBirth, role, gender } = req.body;
        const isSuccessful = await addStaffService(fullname, email, phone, dateOfBirth, role, gender);
        return res.json(isSuccessful);
    }

    
}


module.exports = new userController;