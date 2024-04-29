const { getAllSalesService, getSaleDetailByIDService } = require('../service/order.service');

class SaleController {
    async index(req, res) {
        const sales = await getAllSalesService();
        
        res.render('sale/history', {sales: sales, user: req.session.user});
    }

    async saleDetail(req, res) {
        const { id } = req.params;
        const saleDetails = await getSaleDetailByIDService(id);
        res.render('sale/detail', {saleDetails: saleDetails, saleID: id, user: req.session.user})
    }
}

module.exports = new SaleController;