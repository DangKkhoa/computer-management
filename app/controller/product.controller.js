const { getProductsService, getProductByIdService, updateProductService, deleteProductsService, addProductService, searchProductsService } = require('../service/product.service');

class productController {
    async index(req, res) {
        let products = await getProductsService();
        res.render('products/inventory', {products: products, user: req.session.user, message: ''});
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
        const {importPrice, retailPrice, quantity} = req.body;
        if(isNaN(importPrice) || isNaN(retailPrice) || isNaN(quantity)) {
            return res.send(`
                <h3>Import price, retail price, quantity in stock must be numbers!</h3>
                <h4><a href="/inventory/detail/${productID}">Click heare to go back</a></h4>   
            `);
        }
        console.log(req.file);
        const isUpdated = await updateProductService(productID, importPrice, retailPrice, quantity, req.file);    

        res.redirect(`/inventory/detail/${productID}`)
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

    async search(req, res) {
        const { product_name, category, ram, ssd, price } = req.query;
        console.log(product_name);
        let message = '';
        if(product_name) {
            message += ` [name=${product_name}]`;
        }   
        if(category) {
            message += ` [category=${category}]`;
        }
        if(ram) {
            message += ` [ram=${ram}GB]`;
        }
        if(ssd) {
            message += ` [ssd=${ssd}GB]`;
        }
        if(price) {
            message += ` [price from ${parseInt(price) - 10000000} to ${parseInt(price)}]`;
        }
        
        const products = await searchProductsService(product_name, category, ram, ssd, price);
        res.render('products/inventory', {user: req.session.user, products: products, message: `No product with ${message}`});12   
    }    
}

// console.log(getProducts)
module.exports = new productController;