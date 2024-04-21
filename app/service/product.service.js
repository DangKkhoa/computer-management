const { getProducts, getProductById } = require('../model/product.model');

async function getProductsService() {
    const products = await getProducts();
    return products;
}

async function getProductByIdService(id) {
    const product = await getProductById(parseInt(id));
    return product[0];
}


// console.log(products)
module.exports = { getProductsService, getProductByIdService };