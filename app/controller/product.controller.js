const { getProducts, getProductById } = require('../service/product.service');

class productController {
    index(req, res) {
        let products = getProducts();
        res.render('products', {products: products});
    }

    update(req, res) {
        const productID = req.params.id;
        const product = getProductById(productID);
        console.log(`Update product`);
        res.send(`Update product ${JSON.stringify(product)}`);
    }
}



// console.log(getProducts)
module.exports = new productController;