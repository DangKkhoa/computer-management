const { getAllCustersService } = require('../service/customer.service');

class CustomerController {
    login(req, res) {
        res.render('shop/customerLogin');
    }

    orders(req, res) {
        res.render('shop/orders', {customer: req.session.customer});
    }

    async index(req, res) {
        const customers = await getAllCustersService();
        res.render('customer/index', {user: req.session.user, customers: customers});
    }
}

module.exports = new CustomerController;