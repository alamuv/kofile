/* orderPrices outputs to the console the prices for each order item and order in the orders.json file 
based on the fees in the fees.json file.*/
'use strict';

const fees = require('../../data/fees.json');
const orders = require('../../data/orders.json');

const orderPrices = (orders) => {
  let ordersDetails = [];
  orders.forEach((order) => {
    let orderDetails = {};
    orderDetails.order_number = order.order_number;
    orderDetails.order_items = [];

    const items = order.order_items;
    if (Array.isArray(items)) {
      orderDetails.order_total = items.reduce((prevTotal, item) => {
        let itemDetails = {};
        itemDetails.type = item.type;
        itemDetails.price = itemPrice(item.type, item.pages);
        orderDetails.order_items.push(itemDetails);
        return prevTotal + itemDetails.price;
      }, 0);
    }
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
  console.log('Part 1\n#########################################');
  ordersDetails.forEach((order) => {
    console.log('\nOrder ID: ', order.order_number);
    order.order_items.forEach((item, index) => {
      console.log(' Order item ' + (index+1) + ': $' + item.price);
    });
    console.log(' Order total: $' + order.order_total);
  });
  console.log('#########################################\n\n');
};

printOrderDetails(orderPrices(orders));

module.exports = orderPrices;
