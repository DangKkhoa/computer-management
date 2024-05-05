const { getNumberOfStaffs } = require('../model/user.model');
const { getTotalRevenue } = require('../model/order.model');
const { getNumberOfCustomers } = require('../model/customer.model');
const { getNumberOfOrders, getTotalRevenueEachMonth, getTop5ProductsSold } = require('../model/order.model');

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

async function sendDataToDashboardService() {
    const numberOfStaffs = await getNumberOfStaffs();
    const totalRevenue = await getTotalRevenue();
    const numberOfCustomers = await getNumberOfCustomers();
    const numberOfOrders = await getNumberOfOrders();
    const top5ProductsSold = await getTop5ProductsSold();

    const top5ProductsSoldNormalized = top5ProductsSold[0].map(({totalPrice, ...product}) => {
        return {...product, totalPrice: formatNumber(totalPrice)};
    });

    const dataToSend = {
        numberOfStaffs: numberOfStaffs[0].numOfStaffs,
        totalRevenue: formatNumber(totalRevenue[0].totalRevenue) || 0,
        numberOfCustomers: numberOfCustomers[0].numOfCustomers,
        numberOfOrders: numberOfOrders[0].numOfOrders, 
        top5ProductsSold: top5ProductsSoldNormalized
    }
    return dataToSend;
    
}

async function getTotalRevenueEachMonthService() {
    const saleRevenueEachMonth = await getTotalRevenueEachMonth();
    // return saleRevenueEachMonth[0];
    console.log(saleRevenueEachMonth);

    let dataTosend = saleRevenueEachMonth[0]

    for(let i = 1; i <= 12; i++) {
        const isSaleExist = dataTosend.find((saleData) => saleData.sale_month === i);
        
        if(!isSaleExist) {
            dataTosend.push({sale_month: i, sale_total: 0});
        }
    }
    dataTosend.sort((a, b) => {
        return a.sale_month - b.sale_month;
    })
    return dataTosend;
}

module.exports = { sendDataToDashboardService, getTotalRevenueEachMonthService };