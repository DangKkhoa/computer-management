

class CustomerController {
    login(req, res) {
        res.render('shop/customerLogin');
    }

    orders(req, res) {
        res.render('shop/orders', {customer: req.session.customer});
    }
}

module.exports = new CustomerController;