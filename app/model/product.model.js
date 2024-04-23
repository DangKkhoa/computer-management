const con = require('../database/db');


// let products = [
//     {id: 1, name: 'asus', import_price: 1000, retail_price: 1200, import_date: '22/12/2023', quantity_in_stock: 7},
//     {id: 2, name: 'office', import_price: 300, retail_price: 350, import_date: '19/1/2024', quantity_in_stock: 20},
//     {id: 3, name: 'macbook', import_price: 1200, retail_price: 1500, import_date: '10/7/2023', quantity_in_stock: 10}
// ];

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

async function updateProduct(id, name, category, manufacturer, importPrice, retailPrice, importDate, quantity) {
    try {
        const updateQuery = `UPDATE product SET
            product_name = ?, category = ?, manufacturer = ?, import_price = ?, 
            retail_price = ?, import_date = ?, quantity_in_stock = ? 
            WHERE product_id = ?
        `;
        const updateParam = [name, category, manufacturer, importPrice, retailPrice, importDate, quantity, id];
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


module.exports = { getProducts, getProductById, updateProduct, deleteProducts, addProduct };

