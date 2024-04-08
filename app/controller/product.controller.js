const {getProducts} = require('../service/product.service');

class productController {
    index(req, res) {
        let products = getProducts();
        res.render('products', {products: products});
    }
}



// console.log(getProducts)
module.exports = new productController;