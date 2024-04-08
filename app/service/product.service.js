const products = require('../model/product.model');

function getProducts() {
    return products;
}

// console.log(products)
module.exports = {getProducts};