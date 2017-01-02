'use strict';
const ordersPrices = require('./orderPrices');
const ordersDistribution = require('./orderDistribution');

const ordersPricesHandler = (req, res) => {

  // Bad Request - invalid orders JSON, respond with 400
  if (req.body === undefined || !Array.isArray(req.body)) {
    res.status(400).json({
      message: 'Invalid Orders, expecting an array of orders'
    });
  } else {
    res.status(200).json(ordersPrices(req.body));
  }
};

const ordersDistributionHandler = (req, res) => {
  if (req.body === undefined || !Array.isArray(req.body)) {
    res.status(400).json({
      message: 'Invalid Orders, expecting an array of orders'
    });
  } else {
    res.status(200).json(ordersDistribution(req.body));
  }
};

module.exports = {
  ordersPricesHandler,
  ordersDistributionHandler
};