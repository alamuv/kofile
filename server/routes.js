const router = require('express').Router();
const ordersHandler = require('./requestHandlers/ordersHandler');

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Kofile API' });
});

router.post('/ordersPrices', ordersHandler.ordersPricesHandler);

router.post('/ordersDistribution', ordersHandler.ordersDistributionHandler);

module.exports = router;