/* orderPrices outputs to the console the prices for each order item and order in the orders.json file 
based on the fees in the fees.json file.*/

const fees = require('../data/fees.json');
const orders = require('../data/orders.json');

const orderPrices = (orders) => {
  let ordersDetails = [];
  orders.forEach((order) => {
    let orderDetails = {};
    orderDetails.id = order.order_number;
    orderDetails.items = [];

    const items = order.order_items;
    orderDetails.total = items.reduce((prevTotal, item) => {
      let itemDetails = {};
      itemDetails.type = item.type;
      itemDetails.price = itemPrice(item.type, item.pages);
      orderDetails.items.push(itemDetails);
      return prevTotal + itemDetails.price;
    }, 0);
    ordersDetails.push(orderDetails);
  });
  return ordersDetails;
};

const itemPrice = (type, pages) => {
  const feeType = fees.find((fee) => fee.order_item_type === type);
  return feeType.fees.reduce((prevPrice, fee) => {
    return fee.type === 'flat' ? prevPrice + parseInt(fee.amount) :
      prevPrice + (pages - 1) * parseInt(fee.amount);
  }, 0);
};

/* eslint-disable no-console */
const printOrderDetails = (ordersDetails) => {
  ordersDetails.forEach((order) => {
    console.log('\nOrder ID: ', order.id);
    order.items.forEach((item, index) => {
      console.log(' Order item ' + (index+1) + ': $' + item.price);
    });
    console.log(' Order total: $' + order.total);
  });
};

printOrderDetails(orderPrices(orders));
module.exports = orderPrices;


