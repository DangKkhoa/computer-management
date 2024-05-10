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

async function getNumberOfOrders() {
    const selectQuery = 'SELECT Count(*) AS numOfOrders FROM sale';
    const result = await con.query(selectQuery);
    return result[0];
}

async function getTotalRevenue() {
    const selectQuery = 'SELECT SUM(total_price) AS totalRevenue FROM sale';
    const result = await con.query(selectQuery);

    return result[0];
}

async function getTotalRevenueEachMonth() {
    const selectQuery = `SELECT MONTH(sale_date) AS sale_month, 
                        COALESCE(SUM(total_price), 0) AS sale_total FROM sale
                        GROUP BY MONTH(sale_date)
                    `
    const result = await con.query(selectQuery);
    return result;
}

async function getTop5ProductsSold() {
    const selectQuery = `SELECT sd.product_id, 
                        p.product_name,
                        SUM(sd.quantity) AS quantitySold, 
                        SUM(sd.quantity * sd.unit_price) AS totalPrice
                        FROM sale_detail sd 
                        INNER JOIN product p 
                        WHERE sd.product_id = p.product_id 
                        GROUP BY sd.product_id
                        LIMIT 5;
                    `
    const result = await con.query(selectQuery);
    return result;
}



module.exports = { addOrder, getAllSales, addSaleDetail, getSaleDetailByID, getNumberOfOrders, getTotalRevenue, getTotalRevenueEachMonth, getTop5ProductsSold };