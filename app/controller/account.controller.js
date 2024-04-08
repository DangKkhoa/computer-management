const {getAccounts} = require('../service/account.service');

class accountController {
    index(req, res) {
        let products = getAccounts();
        res.render('products', {products: products});
    }
}


module.exports = new accountController;