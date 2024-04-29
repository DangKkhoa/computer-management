function isCustomerLoggedin(req, res, next) {
    const customer = req.session.customer;
    if(!customer) {
        return res.redirect('/customer/login');
    }
    next();

}

module.exports = { isCustomerLoggedin };