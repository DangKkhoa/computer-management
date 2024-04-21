const con = require('../database/db');


// let products = [
//     {id: 1, name: 'asus', import_price: 1000, retail_price: 1200, import_date: '22/12/2023', quantity_in_stock: 7},
//     {id: 2, name: 'office', import_price: 300, retail_price: 350, import_date: '19/1/2024', quantity_in_stock: 20},
//     {id: 3, name: 'macbook', import_price: 1200, retail_price: 1500, import_date: '10/7/2023', quantity_in_stock: 10}
// ];

async function getProducts() {
    try {
        const selectQuery = 'SELECT * FROM product';
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



module.exports = { getProducts, getProductById };

