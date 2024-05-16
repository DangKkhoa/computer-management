const { addOrder, getAllSales, getSaleDetailByID } = require('../model/order.model');
const { checkOutOfStock } = require('./product.service');
const { v4: uuidv4 } = require('uuid');

function addZero(time) {
    if(time < 10) return `0${time}`;
    return time;
}

async function addOrderService(customer, cart) {
    for(const product of cart) {
        const isOutOfStock = await checkOutOfStock(product);
        if(isOutOfStock) {
            return {code: 4, message: `There are not enough ${product.productName} in stock.`};
        }
    }

    if(cart.length == 0) {
        return {code: 3, message: 'Please buy at least 1 product to continue.'};
    }

    if(!customer.name || !customer.phone || !customer.address) {
        return {code: 2, message: 'Please provide your name, phone number and your current address.'};
    }

    if(customer.phone.length > 10) {
        return {code: 4, message: 'The maximum length for phone number is 10.'};
    }
    let totalPrice = 0;
    let totalQuantity = 0;
    const saleID = uuidv4(); 
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const saleDate = `${year}-${month}-${day}`;

    let hour = date.getHours();
    hour = addZero(hour);
    let minute = date.getMinutes();
    minute = addZero(minute);
    let second = date.getSeconds();
    second = addZero(second);

    const saleTime = `${hour}:${minute}:${second}`;
    cart.forEach((product) => {
        totalPrice += product.productPrice * product.quantity;
        totalQuantity += product.quantity
    })
    
    const isOrderAdded = await addOrder(cart, customer, saleID, totalQuantity, totalPrice, saleDate, saleTime);

    if(isOrderAdded) {
        return {code: 0, message: 'Order added'};
    }
    else {
        return {code: 1, message: 'Something went wrong. Please try again later.'};

    }
    
}

async function getAllSalesService() {
    const sales = await getAllSales();
    return sales;
}

async function getSaleDetailByIDService(saleID) {
    return await getSaleDetailByID(saleID);
}
module.exports = { addOrderService, getAllSalesService, getSaleDetailByIDService };