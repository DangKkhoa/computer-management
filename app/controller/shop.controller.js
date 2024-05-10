const { getProductsService, searchProductsService } = require('../service/product.service');
const { addOrderService } = require('../service/order.service');

class ShopController {
    async shopping(req, res) {
        const products = await getProductsService();
        res.render('shop/shopping', {products: products});
    }

    async category(req, res) {
        const { category } = req.params;
        const products = await searchProductsService(null, category, null, null, null);
        res.render('shop/shopping', {products: products});
    }
    cart(req, res) {
        res.render('shop/cart');
    }

    customerInfo(req, res) {
        res.render('shop/customerInfo');
    }

    async orderProcessing(req, res) {
        const { customer, cart } = req.body;
        
        const jsonMessage = await addOrderService(customer, cart);
        res.send(JSON.stringify(jsonMessage));
    }

    transactionStatus(req, res) {
        res.render('shop/transactionComplete');
    }

    order(req, res) {
        res.render('shop/order', {customer: req.session.customer});
    }

    async search(req, res) {
        const { product_name } = req.query;
        const products = await searchProductsService(product_name, null, null, null, null);
        res.render('shop/shopping', {products: products});
    }
}

module.exports = new ShopController;