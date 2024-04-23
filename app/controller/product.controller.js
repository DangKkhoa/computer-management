const { getProductsService, getProductByIdService, updateProductService, deleteProductsService, addProductService } = require('../service/product.service');

class productController {
    async index(req, res) {
        let products = await getProductsService();
        res.render('products/inventory', {products: products, user: req.session.user});
    }

    async detail(req, res) {
        const productId = req.params.id;
        const product = await getProductByIdService(productId);
        res.render('products/productDetail', {user: req.session.user, product: product});
    }

    add(req, res) {
        res.render('products/addProduct', {user: req.session.user, errorMessage: ''});
    }
    async update(req, res) {
        const productID = req.params.id;
        const {productName, category, manufacturer, importPrice, retailPrice, importDate, quantity} = req.body;
        const isUpdated = await updateProductService(
            productID, productName, category, manufacturer, 
            importPrice, retailPrice, importDate, quantity
        );

        if(isUpdated) {
            res.json({code: 0, message: 'Product updated successfully'});
        }
        else {
            res.json({code: 1, message: `Error while updating product with id=${productID}`});
        }
    }

    async deleteProducts(req, res) {
        const productIds = req.body.product_ids;
        const isDeleted = await deleteProductsService(productIds);
        if(isDeleted) {
            res.json({code: 0, message: 'Products deleted successfully'});
        }
        else {
            res.json({code: 1, message: 'Error while deleting products'});
        }
    }  
    
    async handleAdd(req, res) {
        const {productName, category, manufacturer, ram, ssd, importPrice, retailPrice, quantity} = req.body;
        const isAdded = await addProductService(productName, category, manufacturer, ram, ssd, importPrice, retailPrice, req.file, quantity);

        if(isAdded) {
            return res.redirect('/inventory');
        }
        else {
            return res.render('products/addProduct', {user: req.session.user, errorMessage: 'Something went wrong. Make sure you have provided all the information'});
        }

        

        
    }
    
}



// console.log(getProducts)
module.exports = new productController;