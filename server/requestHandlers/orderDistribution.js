/* orderDistribution outputs to the console the fund distributions for each order in the orders.json file, 
and then output the totals in each fund after processing all orders. */
'use strict';

const fees = require('../../data/fees.json');
const orders = require('../../data/orders.json');

const orderPrices = require('./orderPrices');

const ordersDistribution = (orders) => {
  const ordersPrices = orderPrices(orders);
  const distributions = [];

  ordersPrices.forEach((order) => {
    let orderDetails = {};
    orderDetails.order_number = order.order_number;
    orderDetails.distribution = [];

    order.order_items.forEach((item) => {
      let feeType =  fees.find((fee) => fee.order_item_type === item.type);
      let fundTotal = 0;
      feeType.distributions.forEach((fund) => {
        getFundDist(orderDetails.distribution, fund);
        fundTotal += parseInt(fund.amount);
      });
      if (item.price > fundTotal) {
        getFundDist(orderDetails.distribution, { name: 'Other', amount: item.price - fundTotal});
      }
    });
    distributions.push(orderDetails);
  });
  return distributions;
};

const getFundDist = (distribution, fund) => {

  let fundDistribution = distribution.find((dist) => {
    return dist.name === fund.name;
  });
  if (fundDistribution) {
    fundDistribution.amount += parseInt(fund.amount);
  } else {
    fundDistribution = {};
    fundDistribution.name = fund.name;
    fundDistribution.amount = parseInt(fund.amount);
    distribution.push(fundDistribution);
  }
};

const totalDistribution = (orders) => {
  return orders.reduce((total, order) => {
    order.distribution.forEach((fund) => {
      getFundDist(total, fund);
    });
    return total;
  }, []);
};

/* eslint-disable no-console */
const printDistribution = (orderDistribution) => {
  console.log('\nPart 2\n#########################################');
  orderDistribution.forEach((order) => {
    console.log('\nOrder ID: ' + order.order_number);
    order.distribution.forEach((fund) => {
      console.log(' Fund - ' + fund.name + ': $' + fund.amount);
    })
  });

  console.log('\nTotal distributions:');
  const totalFunds = totalDistribution(orderDistribution);
  totalFunds.forEach((fund) => {
    console.log(' Fund - ' + fund.name + ': $' + fund.amount);
  });
  console.log('#########################################\n\n')
};

printDistribution(ordersDistribution(orders));

module.exports = ordersDistribution;
