const { getProducts, getProductById, updateProduct, deleteProducts, addProduct, searchProduct, getQuantityOfProduct } = require('../model/product.model');

async function getProductsService() {
    const products = await getProducts();
    return products;
}

async function getProductByIdService(id) {
    const product = await getProductById(parseInt(id));
    return product[0];
}

async function updateProductService(productID, importPrice, retailPrice, quantity, productImage) {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const lastUpdateDate = `${year}-${month}-${day}`; 
    if(!productImage) {
        var updatedImageFile = null;
    }
    else {
        var updatedImageFile = productImage.filename;
    }
    
    const updateResult = await updateProduct(productID, updatedImageFile, importPrice, retailPrice, quantity, lastUpdateDate);
    return updateResult;
}

async function deleteProductsService(productIds) {
    const deleteResult = await deleteProducts(productIds);    
    return deleteResult;

}

async function addProductService(productName, category, manufacturer, ram, ssd, importPrice, retailPrice, productImage, quantity) {
    if(!productName || !importPrice || !retailPrice || !productImage || !quantity) {
        return false;
    }
    const numericImportPrice = parseInt(importPrice);
    const numericRetailPrice = parseInt(retailPrice);
    const imageFile = productImage.filename;
    
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const importDate = `${year}-${month}-${day}`;
    const addResult = await addProduct(productName, category, manufacturer, ram, ssd, numericImportPrice, numericRetailPrice, importDate, imageFile, quantity);
    return addResult;
}

async function searchProductsService(productName, category, ram, ssd, price) {
    
    if(price) {
        var maxPrice = parseInt(price);
        var minPrice = maxPrice - 10000000;
    }
    else {
        var maxPrice = null
        var minPrice = null;
    }
    const products = await searchProduct(productName, category, ram, ssd, minPrice, maxPrice);
    return products;
}

async function checkOutOfStock(product) {
    const result = await getQuantityOfProduct(product.productId);
    if(result[0].quantity_in_stock <= 0) {
        return true;
    }
    return false;
}

// console.log(products)
module.exports = { getProductsService, getProductByIdService, updateProductService, deleteProductsService, addProductService, searchProductsService, checkOutOfStock };