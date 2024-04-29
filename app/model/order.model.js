const con = require('../database/db');
const { addCustomer } = require('./customer.model');
const { decrementQuantity } = require('./product.model');

async function addOrder(cart, customer, saleID, totalQuantity, totalPrice, saleDate, saleTime) {
    try {
        const isCustomerAdded = await addCustomer(customer);
        if(isCustomerAdded) {
            const insertQuery = `INSERT INTO sale
                            (sale_id, total_quantity, total_price, 
                            sale_date, sale_time, customer_phone)
                            VALUES (?, ?, ?, ?, ?, ?);
                `
        
            const insertParams = [saleID, totalQuantity, totalPrice, saleDate, saleTime, customer.phone];
            
            const [insertResult] = await con.query(insertQuery, insertParams);

            if(insertResult.affectedRows > 0) {
                return await addSaleDetail(cart, saleID);
            }
            else {
                return false;
            }
        }
    }
    catch(err) {
        console.error(err);
        return false;
    }

}

async function getAllSales() {
    const selectQuery = 'SELECT * FROM sale ORDER BY sale_date DESC, sale_time DESC';
    const [selectResult] = await con.query(selectQuery);
    return selectResult;
}


async function addSaleDetail(cart, saleID) {
    try {
        for(let i = 0; i < cart.length; i++) {
            const insertQuery = `INSERT INTO sale_detail
                            (sale_id, product_id, quantity, unit_price)
                            VALUES (?, ?, ?, ?)
            `;
            // console.log(cart[i].productId);
            const insertParams = [saleID, cart[i].productId, cart[i].quantity, cart[i].productPrice]
    
            const [insertResult] = await con.query(insertQuery, insertParams);
            if(insertResult.affectedRows == 0) {
                return false;
            }

            await decrementQuantity(cart[i].productId, cart[i].quantity);
            
            // If reach the last product, return true
            if(i == cart.length - 1) {
                return true;
            }
        }
    }
    catch(err) {
        console.error(err);
        return false;
    }
    
}

async function getSaleDetailByID(saleID) {
    try {
        const selectQuery = `SELECT sd.*, p.product_name, s.*, c.*
                        FROM sale_detail sd 
                        INNER JOIN product p ON sd.product_id = p.product_id
                        INNER JOIN sale s ON s.sale_id = sd.sale_id
                        INNER JOIN customer c ON s.customer_phone = c.customer_phone
                        WHERE sd.sale_id = ?
            `;
        const selectParam = [saleID];

        const [selectResult] = await con.query(selectQuery, selectParam);
        return selectResult;
    }
    catch(err) {
        console.error(err);
        return [];
    }
}

module.exports = { addOrder, getAllSales, addSaleDetail, getSaleDetailByID };