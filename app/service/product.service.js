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

function deleteProductById(productId) {
    const productToDelete = getProductById(productId);
    return productToDelete;
}

function deleteProductsById(Ids) {
    let productsById = [];
    products.forEach(p => {
        if(Ids.includes(p.id)) {
            productsById.push(p);
        }
    })

    return productsById;
}

// console.log(products)
module.exports = { getProducts, getProductById, deleteProductById, deleteProductsById };