const { getProductsService, getProductByIdService } = require('../service/product.service');

class productController {
    async index(req, res) {
        let products = await getProductsService();
        console.log(products)
        res.render('products', {products: products, user: req.session.user});
    }

    async detail(req, res) {
        const productId = req.params.id;
        const product = await getProductByIdService(productId);
        res.render('productDetail', {user: req.session.user, product: product});
    }

    // update(req, res) {
    //     const productID = req.params.id;
    //     const product = getProductById(productID);
    //     console.log(`Update product`);
    //     res.send(`Update product ${JSON.stringify(product)}`);
    // }

    // delete(req, res) {
    //     const productID = req.params.id;
    //     const productToDelete = deleteProductById(productID);
    //     res.send(`Delete product ${JSON.stringify(productToDelete)}`)
    // }

    // deleteProducts(req, res) {
    //     const productIds = req.body.product_ids;
    //     const products = deleteProductsById(productIds);
    //     if(products) {
    //         res.json({code: 0, message: 'Delete products successfully'});
    //     }
    //     else {
    //         res.json({code: 1, message: 'Cannot delete products now. Please try again later'});
    //     }
    // }   
}



// console.log(getProducts)
module.exports = new productController;