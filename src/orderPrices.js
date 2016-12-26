/* orderPrices outputs to the console the prices for each order item and order in the orders.json file 
based on the fees in the fees.json file.*/

const fees = require('../data/fees.json');
const orders = require('../data/orders.json');

const orderPrices = (orders, fees) => {
  let ordersDetails = [];
  orders.forEach((order) => {
    let orderDetails = {};
    orderDetails.id = order.order_number;
    orderDetails.itemsPrice = []

    const items = order.order_items;
    orderDetails.total = items.reduce((prevTotal, item, index) => {
      orderDetails.itemsPrice.push(itemPrice(fees, item.type, item.pages))
      return prevTotal + orderDetails.itemsPrice[index];
    }, 0);
    ordersDetails.push(orderDetails);
  });
  console.log(ordersDetails)
  return ordersDetails;
};

const itemPrice = (fees, type, pages) => {
  const feeType = fees.find((fee) => fee.order_item_type === type);
  return feeType.fees.reduce((prevPrice, fee) => {
    return fee.type === "flat" ? prevPrice + parseInt(fee.amount) :
      prevPrice + (pages - 1) * parseInt(fee.amount);
  }, 0);
};

printOrderDetails = (ordersDetails) => {
  ordersDetails.forEach((order) => {
    console.log('\nOrder ID: ', order.id);
    order.itemsPrice.forEach((item, index) => {
      console.log(' Order item ' + (index+1) + ': $' + item);
    })
    console.log(' Order total: $' + order.total);
  });
};

printOrderDetails(orderPrices(orders, fees));


