const con = require('../database/db');

async function getProducts() {
    try {
        const selectQuery = 'SELECT * FROM product ORDER BY import_date DESC';
        const [result] = await con.query(selectQuery);
        return result;
    }
    catch(err) {
        console.error(err);
    }
}

async function getProductById(id) {
    try {
        const selectQuery = 'SELECT * FROM product WHERE product_id = ?';
        const selectParam = [id];
        const [result] = await con.query(selectQuery, selectParam);
        return result;
    }
    catch(err) {
        console.error(err);
    }
}

async function updateProduct(id, productImage, importPrice, retailPrice, quantity, lastUpdateDate) {
    try {
        let updateQuery = 'UPDATE product SET last_update_date = ?';
        let updateParam = [lastUpdateDate];
        if(productImage) {
            updateQuery += ' , product_image = ?'
            updateParam.push(productImage);
        }
        if(importPrice) {
            updateQuery += ' , import_price = ?'
            updateParam.push(importPrice);
        }
        if(retailPrice) {
            updateQuery += ' , retail_price = ?'
            updateParam.push(retailPrice);
        }
        if(quantity) {
            updateQuery += ' , quantity_in_stock = ?'
            updateParam.push(quantity);
        }
        updateQuery += ' WHERE product_id = ?'
        updateParam.push(id);
        const [updateResult] = await con.query(updateQuery, updateParam);
        if(updateResult.affectedRows > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    catch(err) {
        console.error(err);
        return false;
    }
}

async function deleteProducts(proudctIds) {
    try {
        const deleteQuery = 'DELETE FROM product WHERE product_id IN (?)';
        const deleteParam = [proudctIds];
        const [deleteResult] = await con.query(deleteQuery, deleteParam);
        if(deleteResult.affectedRows > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    catch(err) {
        console.error(err);
        return false;
    }
}

async function addProduct(productName, category, manufacturer, ram, ssd, importPrice, retailPrice, importDate, productImage, quantity) {
    try {
        const insertQuery = `INSERT INTO product
                        (product_name, category, product_image, manufacturer, ram, ssd, import_price,
                        retail_price, import_date, quantity_in_stock)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `
        const insertParam = [productName, category, productImage, manufacturer, ram, ssd, importPrice, retailPrice, importDate, quantity];
        const [insertResult] = await con.query(insertQuery, insertParam);
        if(insertResult.affectedRows > 0) {
            return true;
        }
        else {
            return false;
        }
        
    }
    catch(err) {
        console.error(err);
        return false;
    }
}

async function searchProduct(productName, category, ram, ssd, minPrice, maxPrice) {
    let selectQuery = 'SELECT * FROM product WHERE 1 = 1';
    let selectParam = [];
    if(productName) {
        selectQuery += ' AND product_name LIKE ?';
        selectParam.push(`%${productName}%`);
    }
    if(category) {
        selectQuery += ' AND category LIKE ?';
        selectParam.push(`%${category}%`);
    }
    if(ram) {
        selectQuery += ' AND ram = ?';
        selectParam.push(ram);
    }
    if(ssd) {
        selectQuery += ' AND ssd = ?';
        selectParam.push(ssd);
    }
    if(minPrice && maxPrice) {
        selectQuery += ' AND retail_price BETWEEN ? AND ?';
        selectParam.push(minPrice);
        selectParam.push(maxPrice);
    }
    
    const [products] = await con.query(selectQuery, selectParam);
    // if no category or price selected, return an empty array of product 
    return products;
}

async function decrementQuantity(productID, quantity) {
    try {
        const updateQuery = 'UPDATE product SET quantity_in_stock = quantity_in_stock - ? WHERE product_id = ?';
        const updateParam = [quantity, productID];
        const [updateResult] = await con.query(updateQuery, updateParam);

        
        if(updateResult.affectedRows > 0) {
            return true;
        }
        else {
            return false;
        }

    }
    catch(err) {
        console.error(err);
        return false;
    }
}

module.exports = { getProducts, getProductById, updateProduct, deleteProducts, addProduct, searchProduct, decrementQuantity };

