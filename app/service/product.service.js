const { getProducts, getProductById, updateProduct, deleteProducts, addProduct } = require('../model/product.model');

async function getProductsService() {
    const products = await getProducts();
    return products;
}

async function getProductByIdService(id) {
    const product = await getProductById(parseInt(id));
    return product[0];
}

async function updateProductService(productID, productName, category, manufacturer, importPrice, retailPrice, importDate, quantity) {
    const importDateArray = importDate.split('/').reverse();
    const formattedImportDate = importDateArray.join('-');

    const updateResult = await updateProduct(parseInt(productID), productName, category, manufacturer, importPrice, retailPrice, formattedImportDate, quantity)
    return updateResult;
}

async function deleteProductsService(productIds) {
    const deleteResult = await deleteProducts(productIds);    
    return deleteResult;

}

async function addProductService(productName, category, manufacturer, importPrice, retailPrice, productImage, quantity) {
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
    console.log(importDate);
    const addResult = await addProduct(productName, category, manufacturer, numericImportPrice, numericRetailPrice, importDate, imageFile, quantity);
    return addResult;
}
// console.log(products)
module.exports = { getProductsService, getProductByIdService, updateProductService, deleteProductsService, addProductService };