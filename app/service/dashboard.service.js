const { getNumberOfStaff } = require('../model/user.model');
const { getTotalRevenue } = require('../model/order.model');

async function sendDataToDashboardService() {
    const numberOfUser = await getNumberOfStaff();
    const totalRevenue = await getTotalRevenue();

    console.log(`Number of staff: ${numberOfUser[0].numOfStaff}`);

    const dataToSend = {
        numberOfUser: numberOfUser[0].numOfStaff,
        totalRevenue: totalRevenue[0].totalRevenue,
    }
    return dataToSend;
    
}

module.exports = { sendDataToDashboardService };