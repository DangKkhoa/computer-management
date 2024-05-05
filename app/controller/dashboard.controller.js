const { sendDataToDashboardService, getTotalRevenueEachMonthService } = require('../service/dashboard.service');

class DashboardController {
    async index(req, res) {
        const data = await sendDataToDashboardService();
        res.render('dashboard', {user: req.session.user, data: data});
    }

    async dataOfChart(req, res) {
        const data = await getTotalRevenueEachMonthService();
        res.send(data);
    }
}

module.exports = new DashboardController;