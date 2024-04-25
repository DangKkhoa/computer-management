const { getProductsService, searchProductsService } = require('../service/product.service');

class sitesController {
    dashboard(req, res) {
        res.render('dashboard', {user: req.session.user});
    }

    async shopping(req, res) {
        const products = await getProductsService();
        res.render('shopping', {products: products});
    }

    async category(req, res) {
        const { category } = req.params;
        const products = await searchProductsService(null, category, null, null, null);
        res.render('shopping', {products: products});
    }
}

module.exports = new sitesController;