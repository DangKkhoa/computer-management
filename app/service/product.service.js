const products = require('../model/product.model');

function getProducts() {
    return products;
}

function getProductById(productId) {
    for(let i = 0; i < products.length; i++) {
        if(products[i].id == productId) {
            return {id: products[i].id, name: products[i].name, price: products[i].price};
        }
    }
}

// console.log(products)
module.exports = { getProducts, getProductById };