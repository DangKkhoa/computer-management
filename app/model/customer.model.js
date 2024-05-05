const con = require('../database/db');


async function addCustomer(customer) {
    try {
        const selectQuery = `SELECT * FROM customer WHERE customer_phone = ?`;
        const selectParam = [customer.phone];
        const [selectResult] = await con.query(selectQuery, selectParam);
        if(selectResult.length > 0) {
            return true;
        } 
        else {
            const insertQuery = `INSERT INTO customer
                        (customer_name, customer_phone, 
                        customer_address, customer_email)
                        VALUES (?, ?, ?, ?)
                `;

            const insertParams = [customer.name, customer.phone, customer.address, customer.email];
            const [insertResult] = await con.query(insertQuery, insertParams);

            if(insertResult.affectedRows > 0) {
                return true;
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

async function getNumberOfCustomers() {
    const selectQuery = 'SELECT COUNT(*) as numOfCustomers FROM customer';
    const result = await con.query(selectQuery);
    console.log(result[0]);
    return result[0];
}
module.exports = { addCustomer, getNumberOfCustomers };