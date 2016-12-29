/* orderDistribution outputs to the console the fund distributions for each order in the orders.json file, 
and then output the totals in each fund after processing all orders. */

// import { orderPrices } from './orderPrices';
const fees = require('../../data/fees.json');
const orders = require('../../data/orders.json');

const orderPrices = require('./orderPrices');

const ordersDistribution = (orders) => {
  const orderDetails = orderPrices(orders, fees);
  const distribution = [];

  orderDetails.forEach((order) => {
    let orderDistribution = {};
    orderDistribution.id = order.id;

    order.items.forEach((item) => {
      let feeType =  fees.find((fee) => fee.order_item_type === item.type);
      let fundTotal = 0;
      feeType.distributions.forEach((fund) => {
        orderDistribution[fund.name] = orderDistribution[fund.name] || 0;
        orderDistribution[fund.name] += parseInt(fund.amount);
        fundTotal += parseInt(fund.amount);
      });
      if (item.price > fundTotal) {
        orderDistribution['Other'] = orderDistribution.Other || 0;
        orderDistribution['Other'] += item.price - fundTotal;
      }
    });
    distribution.push(orderDistribution);
  });
  return distribution;
};

const totalDistribution = (orderDistribution) => {
  return orderDistribution.reduce((total, order) => {
    for (let key in order) {
      if (key !== 'id') {
        total[key] = !total.hasOwnProperty(key) ? 0 : total[key];
        total[key] += order[key];
      }
    }
    return total;
  }, {});
};

/* eslint-disable no-console */
const printDistribution = (orderDistribution) => {
  orderDistribution.forEach((order) => {
    for (let key in order) {
      if (key === 'id') {
        console.log('\nOrder ID: ' + order.id);
      } else {
        console.log(' Fund - ' + key + ': $' + order[key]);
      }
    }
  });

  console.log('\nTotal distributions:');
  const totalFunds = totalDistribution(orderDistribution);
  for (let fund in totalFunds) {
    console.log(' Fund - ' + fund + ': $' + totalFunds[fund]);
  }
};

printDistribution(ordersDistribution(orders));

module.exports = ordersDistribution;
