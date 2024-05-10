const { getUsers, getUserWithId, getUsersByNameService, addStaffService, deleteUserByIdService, updateUserInfoService } = require('../service/user.service');

class UserController {
    async index(req, res) {
        let users = await getUsers();
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
        try {
            const userId = parseInt(req.params.id);
            const user = await getUserWithId(userId);
            if(user) {
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

    async updateInfo(req, res) {
        const { id } = req.query;
        res.render('staffs/profile', {user: req.session.user});
    }

    async handleUpdateInfo(req, res) {
        // const { id } = req.params;
        const userId = req.session.user.user_id;
        const { fullname, email, username, phone, gender } = req.body;
        
        const isUpdated = await updateUserInfoService(userId, fullname, email, username, phone, gender, req.file);
        if(isUpdated.code === 0) {
            res.send(`<h1>User updated successfully. Please <a href="/auth/logout">Sign out to see the changes</a></h1>
                    <h2>Click <a href="/profile">here</a> if you want to go back</h2>
            `)
        }
        else {
            res.send(`<h1>Something went wrong. <a href="/profile">Click here to go back</a></h1>`)
        }
        
    }


    
}


module.exports = new UserController;