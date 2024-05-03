const { sendDataToDashboardService } = require('../service/dashboard.service');

class DashboardController {
    async index(req, res) {
        const data = await sendDataToDashboardService();
        res.render('dashboard', {user: req.session.user, data: data});
    }
}

module.exports = new DashboardController;