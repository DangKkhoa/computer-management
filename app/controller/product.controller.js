const { getProducts, getProductById, deleteProductById } = require('../service/product.service');

class productController {
    index(req, res) {
        let products = getProducts();
        res.render('products', {products: products, user: req.session.user});
    }

    update(req, res) {
        const productID = req.params.id;
        const product = getProductById(productID);
        console.log(`Update product`);
        res.send(`Update product ${JSON.stringify(product)}`);
    }

    delete(req, res) {
        const productID = req.params.id;
        const productToDelete = deleteProductById(productID);
        res.send(`Delete product ${JSON.stringify(productToDelete)}`)
    }
}



// console.log(getProducts)
module.exports = new productController;